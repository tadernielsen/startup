import React, { useEffect } from 'react';
import './games.css';

import { GamePost } from './gamepost.jsx';
import { event, client } from '../userClient.js';

export function Games({user, isDeveloper}) {
  const [games, setGames] = React.useState([]);
  const [newGame, setNewGame] = React.useState(false);

  useEffect(() => {
    fetch('/api/data/Games')
    .then((res) => res.json())
    .then((game) => setGames(game))
  }, []);

  function addNewGame()
  {
    setNewGame(!newGame);
  }

  async function uploadImage(ImageFile)
  {
    const file = ImageFile.files[0];
    if (file)
    {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/data/Games/Images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok)
      {
        return data.file;
      }
      else
      {
        alert(data.message);
        return "placeholder.png";
      }
    }
  }

  async function saveGame(image, title, description, install)
  {
    if (image.files.length === 0)
    {
      image = "placeholder.png";
    }
    else
    {
      image = await uploadImage(image);
    }

    const newPost = new GamePost('GameImages/' + image, title, description, install, user);

    const addGame = await fetch('/api/data/Games', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newPost.returnJson()),
    })

    const res = await addGame.json();
    if (addGame?.status === 200)
    {
      const savedPosts = games;

      savedPosts.push(res.newGame);

      setGames(savedPosts);

      client.sendMessage(user, event.newGame, {title: newPost.title});
    }
    else
    {
      alert(res.msg);
    }

    setNewGame(false);
  }

  async function updatePost(ID, likeAccounts, favoritedAccounts)
  {
    const callPost = await fetch('/api/data/Games', {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID, likedAccounts: likeAccounts, favoritedAccounts: favoritedAccounts, user: user})
    });

    if (callPost.status === 200)
    {
      const updatedPosts = games.map(post => post._id === ID ? { ...post, "likedAccounts": likeAccounts, "favoritedAccounts": favoritedAccounts } : post);
      setGames(updatedPosts);
    }
    else
    {
      const res = await callPost.json();
      alert(res.msg);
    }
  }

  async function deletePost(ID)
  {
    const removePost = await fetch('/api/data/Games', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID}),
    });

    if (removePost.status === 200)
    {
      const updatedPosts = games.filter(post => post._id !== ID);
      setGames(updatedPosts);
    }
    else
    {
      const res = await removePost.json();
      alert(res.msg);
    }
  }

  const savedGames = [];
  if (games.length)
  {
    for (const [i, game] of games.entries())
    {
      const post = new GamePost(game.image, game.title, game.description, game.installURL, user, game.likedAccounts, game.favoritedAccounts, game._id);
      savedGames.push(post.initilizePost(isDeveloper, user, updatePost, deletePost));
    }
  }

  return (
    <main className="gamePage">
        <h2>Games</h2>
        <button className="devButton" onClick={addNewGame} hidden={!isDeveloper}>Add Game</button>
        
        <section className="games">
        {newGame ? (
            <div className="game newGame">
              <input type="file" accept=".png, jpeg, .jpg" id="editGameImage" placeholder="image"></input>
              <input type="text" id="editGameTitle" placeholder='Title' maxLength={15}></input>
              <textarea type="textarea" id="editGameDescription" placeholder="Enter description here"></textarea>
              <input type="text" id="editURL" placeholder="install URL"></input>
              <button className="saveButton" onClick={() => saveGame(document.getElementById('editGameImage'), document.getElementById('editGameTitle').value, document.getElementById('editGameDescription').value, document.getElementById('editURL').value)}>Post</button>
            </div>
            ) : (null)
          }

          {savedGames}
      </section>

      {/*
        <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <div className="likeCounter">
                <b>0</b>
                <button className="like">👍</button>
              </div>
              <button className="favorite">⭐</button>
              <button className="download">Download</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
      */}
    </main>
  );
}
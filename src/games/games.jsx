import React, { useEffect } from 'react';
import './games.css';

import { GamePost } from './gamepost.jsx';

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

  async function saveGame(image, title, description, install)
  {
    if (image === "")
    {
      image = "placeholder.png";
    }

    const newPost = new GamePost(Date.now(), image, title, description, install, user);

    const sendGame = await fetch('/api/data/Games', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newPost.returnJson()),
    })

    const savedPosts = await sendGame.json();
    const updatedPosts = savedPosts.games;
    setGames(updatedPosts);

    setNewGame(false);
  }

  async function updatePost(ID, likeAccounts, favoritedAccounts)
  {
    const updatedPosts = await fetch('/api/data/Games', {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID, likedAccounts: likeAccounts, favoritedAccounts: favoritedAccounts})
    });

    const newPosts = await updatedPosts.json();

    setGames(newPosts.games);
  }

  async function deletePost(ID)
  {
    const removedGame = await fetch('/api/data/Games', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID})
    });

    const newPosts = await removedGame.json();

    if (removedGame?.status === 200)
    {
      setGames(newPosts.games)
    }
    else
    {
      alert(newPosts.msg)
    }
  }

  const savedGames = [];
  if (games.length)
  {
    for (const [i, game] of games.entries())
    {
      const post = new GamePost(game.ID, game.image, game.title, game.description, game.installURL, user, game.likedAccounts, game.favoritedAccounts);
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
              <input type="image" src="placeholder.png" id="editGameImage" alt="Submit"></input>
              <input type="text" id="editGameTitle" placeholder='Title' maxLength={15}></input>
              <textarea type="textarea" id="editGameDescription" placeholder="Enter description here"></textarea>
              <input type="text" id="editURL" placeholder="install URL"></input>
              <button className="saveButton" onClick={() => saveGame(document.getElementById('editGameImage').value, document.getElementById('editGameTitle').value, document.getElementById('editGameDescription').value, document.getElementById('editURL').value)}>Post</button>
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
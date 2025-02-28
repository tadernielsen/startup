import React, { useEffect } from 'react';
import './games.css';

import { GamePost } from './gamepost.jsx';

export function Games({user, isDeveloper}) {
  const [games, setGames] = React.useState([]);
  const [newGame, setNewGame] = React.useState(false);

  useEffect(() => {
    const savedGames = localStorage.getItem('games')
    if (savedGames)
    {
      setGames(JSON.parse(savedGames))
    }
  }, []);

  function addNewGame()
  {
    setNewGame(!newGame);
  }

  function saveGame(image, title, description, install)
  {
    if (image === "")
    {
      image = "placeholder.png";
    }
    const newPost = new GamePost(Date.now(), image, title, description, install);
    const updatedPost = [...games, newPost.returnJson()];
    localStorage.setItem('games', JSON.stringify(updatedPost));
    setGames(updatedPost);
    setNewGame(false);
  }

  function updatePost(ID, likeAccounts, favoritedAccounts)
  {
    const updatedPosts = games.map(post => post.ID === ID ? { ...post, "likedAccounts": likeAccounts, "favoritedAccounts": favoritedAccounts, "favorited": favoritedAccounts.includes(user) } : post);
    localStorage.setItem('games', JSON.stringify(updatedPosts));
    setGames(updatedPosts);
  }

  function deletePost(ID)
  {
    const updatedPosts = games.filter(post => post.ID !== ID);
    localStorage.setItem('games', JSON.stringify(updatedPosts));
    setGames(updatedPosts);
  }

  const savedGames = [];
  if (games.length)
  {
    for (const game of games.entries())
    {
      const post = new GamePost(game[1].ID, game[1].image, game[1].title, game[1].description, game[1].installURL, game[1].likedAccounts, game[1].favoritedAccounts, game[1].favorited);
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
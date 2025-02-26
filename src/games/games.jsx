import React, { useEffect } from 'react';
import './games.css';

class GamePost
{
  #liked = false;
  #favorite = false;

  constructor(image = "placeholder.png", title, description, likeCount = 0)
  {
    this.image = image;
    this.title = title;
    this.description = description;
    this.likeCount = likeCount;
  }

  likeButton()
  {
    if (this.#liked)
    {
      this.likeCount -= 1;
      this.#liked = false;
    }
    else
    {
      this.likeCount += 1;
      this.#liked = true;
    }
  }

  favoriteButton()
  {
    if (this.#favorite)
    {
      this.#favorite = false;
    }
    else
    {
      this.#favorite = true;
    }
  }

  downloadButton()
  {
    // Downloads game (Or send them somewhere else idk yet)
  }

  initilizePost()
  {
    return (
      <div className="game">
        <div className="gameInfo">
          <img src={this.image}/>
          <h3>{this.title}</h3>
          <p>{this.description}</p>
        </div>
        <div className="gameButtons">
          <div className="likeCounter">
              <b>{this.likeCount}</b>
              <button className="like" onClick={this.likeButton}>👍</button>
          </div>
          <button className="favorite" onClick={this.favoriteButton}>⭐</button>
          <button className="download">Download</button>
        </div>
        <button className="devButton">Edit</button>
      </div>
    )
  }

  returnJson()
  {
    return {"Image": this.image, "title": this.title, "description": this.description, "likeCount": this.likeCount}
  }
}

export function Games() {
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
    if (!newGame)
    {
      setNewGame(true)
    }
    else
    {
      setNewGame(false)
    }
  }

  function saveGame(image, title, description)
  {
    if (image === "")
    {
      image = "placeholder.png";
    }
    const newPost = new GamePost(image, title, description);
    
    games.push(newPost.returnJson());
    localStorage.setItem('games', JSON.stringify(games));
    setNewGame(false);
  }

  const savedGames = [];
  if (games.length)
  {
    for (const game of games.entries())
    {
      const post = new GamePost(game[1].image, game[1].title, game[1].description)
      savedGames.push(post.initilizePost());
    }
  }

  return (
    <main className="gamePage">
        <h2>Games</h2>
        <button className="devButton" onClick={addNewGame}>Add Game</button>
        
        <section className="games">
        {newGame ? (
            <div className="game newGame">
              <input type="image" src="placeholder.png" id="editGameImage" alt="Submit"></input>
              <input type="text" id="editGameTitle" placeholder='Title' maxLength={15}></input>
              <textarea type="textarea" id="editGameDescription" placeholder="Enter description here"></textarea>
              <button className="saveButton" onClick={() => saveGame(document.getElementById('editGameImage').value, document.getElementById('editGameTitle').value, document.getElementById('editGameDescription').value)}>Post</button>
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
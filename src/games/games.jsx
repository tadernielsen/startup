import React, { useEffect } from 'react';
import './games.css';

class GamePost
{
  constructor(ID, image = "placeholder.png", title, description, likedAccounts = [], favoritedAccounts = [], favorited = false)
  {
    this.ID = ID;
    this.image = image;
    this.title = title;
    this.description = description;
    this.likeCount = likedAccounts.length;
    this.likedAccounts = likedAccounts;
    this.favoritedAccounts = favoritedAccounts;
    this.favorited = favorited;
  }

  likeButton(username, updatePost)
  {
    if (!username)
    {
      return;
    }

    if (this.likedAccounts.includes(username))
    {
      this.likedAccounts = this.likedAccounts.filter(account => account !== username);
      this.likeCount = this.likedAccounts.length;
    }
    else
    {
      this.likedAccounts.push(username);
      this.likeCount = this.likedAccounts.length;
    }
    updatePost(this.ID, this.likedAccounts, this.favoritedAccounts);
  }

  favoriteButton(username, updatePost)
  {
    if (!username)
    {
      return;
    }

    if (this.favoritedAccounts.includes(username))
      {
        this.favoritedAccounts = this.favoritedAccounts.filter(account => account !== username);
        this.favorited = false;
      }
      else
      {
        this.favoritedAccounts.push(username);
        this.favorited = true;
      }
      updatePost(this.ID, this.likedAccounts, this.favoritedAccounts);
  }

  downloadButton()
  {
    // Downloads game (Or send them somewhere else idk yet)
  }

  favoriteTag()
  {
    return this.favorited ? "⭐" : "☆";
  }

  initilizePost(isDeveloper, username, updatePost)
  {
    return (
      <div className="game" key={this.ID}>
        <div className="gameInfo">
          <img src={this.image}/>
          <h3>{this.title}</h3>
          <p>{this.description}</p>
        </div>
        <div className="gameButtons">
          <div className="likeCounter">
              <b>{this.likeCount}</b>
              <button className="like" onClick={() => this.likeButton(username, updatePost)}>👍</button>
          </div>
          <button className="favorite" onClick={() => this.favoriteButton(username, updatePost)}>{this.favoriteTag()}</button>
          <button className="download">Download</button>
        </div>
        <button className="devButton" hidden={!isDeveloper}>Edit</button>
      </div>
    )
  }

  returnJson()
  {
    return {"ID": this.ID, "Image": this.image, "title": this.title, "description": this.description, "likedAccounts": this.likedAccounts, "favoritedAccounts": this.favoritedAccounts, "favorited": this.favorited}
  }
}

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

  function saveGame(image, title, description)
  {
    if (image === "")
    {
      image = "placeholder.png";
    }
    const newPost = new GamePost(Date.now(), image, title, description);
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

  const savedGames = [];
  if (games.length)
  {
    for (const game of games.entries())
    {
      const post = new GamePost(game[1].ID, game[1].image, game[1].title, game[1].description, game[1].likedAccounts, game[1].favoritedAccounts, game[1].favorited);
      savedGames.push(post.initilizePost(isDeveloper, user, updatePost));
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
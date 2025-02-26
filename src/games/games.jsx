import React from 'react';
import './games.css';

class GamePost
{
  #liked = false;
  #favorite = false;

  constructor(image, title, description, likeCount = 0)
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
        setLogs(JSON.parse(savedGames))
      }
  }, []);

  function addNewGame()
  {
    if (!newPost)
    {
      setNewGame(true)
    }
    else
    {
      setNewGame(false)
    }
  }

  function savePost(image, title, description)
  {
    const newPost = new GamePost(image, title, description);
    
    games.push(newPost.returnJson());
    localStorage.setItem('games', JSON.stringify(logs));
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
        <button className="devButton">Add Game</button>
        
        <section className="games">
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
          <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <button className="like">👍</button>
              <button className="favorite">⭐</button>
              <button className="download">Download</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
          <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <button className="like">👍</button>
              <button className="favorite">⭐</button>
              <button className="download">Download</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
      </section>
    </main>
  );
}
import React from 'react';
import './games.css';

export function Games() {
  return (
    <main className="gamePage">
        <h2>Games</h2>
        <a className="devButton" hidden><button>Add Game</button></a>
        
        <section className="games">
          <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <a href=""><button className="like">👍</button></a>
              <a href=""><button className="favorite">⭐</button></a>
              <a href=""><button className="download">Download</button></a>
            </div>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
          <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <a href=""><button className="like">👍</button></a>
              <a href=""><button className="favorite">⭐</button></a>
              <a href=""><button className="download">Download</button></a>
            </div>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
          <div className="game">
            <div className="gameInfo">
              <img src="placeholder.png"/>
              <h3>Game 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div className="gameButtons">
              <a href=""><button className="like">👍</button></a>
              <a href=""><button className="favorite">⭐</button></a>
              <a href=""><button className="download">Download</button></a>
            </div>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
      </section>
    </main>
  );
}
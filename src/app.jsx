import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body'>
      <header>
      <div className="headerTop">
        <div className="title">
          <img src="public/V2 TN.jpg"></img>
          <h1><span>TN</span>-Games.com</h1>
        </div>
        
        <div className="topRight">
        
        <a href="login.html" id="username"><button type="button" className="btn btn-secondary btn-lg">LOGIN</button></a>

        </div>
      </div>

      <nav className="mainNav">
        <a href="index.html"><button type="button" className="btn btn-outline-dark btn-sm">HOME</button></a>
        <a href="devlog.html"><button type="button" className="btn btn-outline-dark btn-sm">DEVLOG</button></a>
        <a href="games.html"><button type="button" className="btn btn-outline-dark btn-sm">GAMES</button></a>
      </nav>
      
    </header>

      <main>App components go here</main>

      <footer>
      <div>
        <span>Kaden Nielsen</span>
        <a href="https://github.com/tadernielsen/startup"><button type="button" className="btn btn-secondary">GitHub</button></a>
      </div>
      <p id="randomGeekJoke">Geek Joke here</p>
    </footer>
    </div>
  );
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Games } from './games/games';
import { Devlog } from './devlog/devlog';
import { Login } from './login/login';

export default function App() {
  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <div className="headerTop">
            <div className="title">
              <img src="public/V2 TN.jpg"></img>
              <h1><span>TN</span>-Games.com</h1>
            </div>
            
            <div className="topRight">
              <NavLink to="login" id="username">
                <button type="button" className="btn btn-secondary btn-lg">LOGIN</button>
              </NavLink>
            </div>
          </div>

          <nav className="mainNav">
            <NavLink to="">
              <button type="button" className="btn btn-outline-dark btn-sm">HOME</button>
            </NavLink>
            <NavLink to="devlog">
              <button type="button" className="btn btn-outline-dark btn-sm">DEVLOG</button>
            </NavLink>
            <NavLink to="games">
              <button type="button" className="btn btn-outline-dark btn-sm">GAMES</button>
            </NavLink>
          </nav>
        
        </header>

        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/devlog' element={<Devlog />} />
          <Route path='/games' element={<Games />} />
          <Route path='/login' element={<Login />} /> // Needs to be changed for own login page
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div>
            <span>Kaden Nielsen</span>
            <a href="https://github.com/tadernielsen/startup"><button type="button" className="btn btn-secondary">GitHub</button></a>
          </div>
          <p id="randomGeekJoke">Geek Joke here</p>
        </footer>
      </div>
    </BrowserRouter>
  );

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
}
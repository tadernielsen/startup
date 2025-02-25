import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// Routing
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Games } from './games/games';
import { Devlog } from './devlog/devlog';
import { Login } from './login/login';

import { Button } from 'react-bootstrap';

// Extra stuff
import { useGlitch, } from 'react-powerglitch'

export default function App() {
  const [joke, setJoke] = React.useState('Loading joke...');
  const [headerImage, setHeaderImage] = React.useState('TN PFP V3.png');
  const images = ['TN PFP V3.png', 'V2 TN.jpg', 'V1 TN.png', 'OG TN.png', 'TN games PFP.png', 'TN Galaxy.png', 'TNYT logo.png', 'Halloween TN.png', 'TN chrismas Logo.png', 'TN chrismas V2.png', 'TN COVID-19.png', 'TN halloween 2021 pfp.png'];

  const glitch = useGlitch({"playMode": "click", glitchTimeSpan: false});

  React.useEffect(() => {
    setJoke('Epic Geek Joke');
  }, []);

  function generateRandomImage() 
  {
    const min = 0;
    const max = images.length;
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    setHeaderImage(images[randomNumber]);
  }

  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <div className="headerTop">
            <div className="title">
              <img src={headerImage} onClick={generateRandomImage} ref={glitch.ref}></img>
              <h1><span>TN</span>-Games.com</h1>
            </div>
            
            <div className="topRight">
              <NavLink to="login" id="username">
                <Button type="button" variant='secondary' size="lg">LOGIN</Button>
              </NavLink>
            </div>
          </div>

          <nav className="mainNav">
            <NavLink to="">
              <Button variant='outline-dark' size="sm">HOME</Button>
            </NavLink>
            <NavLink to="devlog">
              <Button variant='outline-dark' size="sm">DEVLOG</Button>
            </NavLink>
            <NavLink to="games">
              <Button variant='outline-dark' size="sm">GAMES</Button>
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
            <a href="https://github.com/tadernielsen/startup"><Button variant='secondary'>GitHub</Button></a>
          </div>
          <p id="randomGeekJoke">{joke}</p>
        </footer>
      </div>
    </BrowserRouter>
  );

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
}
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// Routing
import { BrowserRouter, data, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Games } from './games/games';
import { Devlog } from './devlog/devlog';
import { Login } from './login/login';
import { AuthState } from './login/authState';

import { Button } from 'react-bootstrap';

// Extra stuff
import { useGlitch } from 'react-powerglitch'

export default function App() {
  const [joke, setJoke] = React.useState('Loading joke...');
  const [headerImage, setHeaderImage] = React.useState('TN PFP V3.png');

  const [username, setUser] = React.useState(localStorage.getItem('username') || null);
  const [userType, setUserType] = React.useState(localStorage.getItem('userType') || null);
  const isDeveloper = userType === "developer";
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const glitch = useGlitch({"playMode": "click", glitchTimeSpan: false});

  React.useEffect(() => {
    setJoke(getGeekJoke());
  }, []);

  function generateRandomImage() 
  {
    fetch('/api/data/TNimages')
    .then((res) => res.json())
    .then((image) => setHeaderImage(image.img));
  }

  function getGeekJoke()
  {
    fetch ('https://perl.is/random')
    .then((response) => response.json())
    .then((data) => setJoke(data.quote))
    .catch(setJoke('Error: Fetch failed.'));
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
                <Button type="button" variant='secondary' size="lg">{username || "LOGIN"}</Button>
              </NavLink>
              {isDeveloper ? (
                <h2>DEVELOPER MODE</h2>
              ) : (null)}
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
          <Route path='/' element={<Home isDeveloper={isDeveloper}/>} exact />
          <Route path='/devlog' element={<Devlog user={username} isDeveloper={isDeveloper}/>} />
          <Route path='/games' element={<Games user={username} isDeveloper={isDeveloper}/>} />
          <Route path='/login' element={<Login 
          username={username} 
          userType={userType} 
          authState={authState} 

          AuthChange={(userName, userType, authState) => {
            setUser(userName);
            setUserType(userType);
            setAuthState(authState);
          }}
          />} />
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
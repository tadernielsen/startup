import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated({setUser, setUserType}) {
  const nav = useNavigate();

  function logout()
  {
    console.log('Logging out');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
    nav('/');
  }

  return (
    <main className="loginPage">
      <div className="login loggedIn">
        <h1>Currently Logged in:</h1>
        <h2>{localStorage.getItem('username')}</h2>
        <div className="buttons">
            <Button variant='primary' onClick={logout}>Log out</Button>
        </div>
        <NavLink to="/">Back</NavLink>
      </div>
    </main>
  );
}
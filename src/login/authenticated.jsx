import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated({onLogout}) {
  const nav = useNavigate();

  function logout()
  {
    fetch('/api/auth/Logout', {
      method: 'DELETE',
    })
      .then(() => {
        onLogout();
        nav('/');
      })
      .catch(() => {
        alert('Logout Failed (Possibly Offline?)');
      });
  }

  return (
    <div className="login loggedIn">
      <h1>Currently Logged in:</h1>
      <h2>{localStorage.getItem('username')}</h2>
      <div className="buttons">
          <Button variant='primary' onClick={logout}>Log out</Button>
      </div>
      <NavLink to="/">Back</NavLink>
    </div>
  );
}
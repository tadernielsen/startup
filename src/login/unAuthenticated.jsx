import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function UnAuthenticated({onLogin}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const nav = useNavigate();

  function loginAccount() {
    localStorage.setItem('username', username);
    localStorage.setItem('userType', 'normal');

    // setUser(username);
    // setUserType('normal');

    onLogin(username, 'normal');

    nav('/');
  }

  async function createAccount() {
    const response = await fetch('/api/auth/CreateAccount', {
      method: 'POST',
      body: JSON.stringify({email: username, password: password}),
      headers: {
        'Content-type': 'application/json',
      },
    });

    // setUser(username);
    // setUserType('normal');

    if (response?.status === 200)
    {
      onLogin(username, 'normal');
      nav('/');
    }
    else
    {
      const body = await response.json();
      alert(body.msg);
    }
  }

  function loginDeveloper() {
    localStorage.setItem('username', username);
    localStorage.setItem('userType', 'developer');

    // setUser(username);
    // setUserType('developer');

    onLogin(username, 'developer');
    
    nav('/');
  }

  return (
    <div className="login">
        <h1>Login</h1>
            <div className="input-group mb-3">
                <label className="input-group-text" for="username">Username:</label>
                <input className="form-control" type="text" id="username" placeholder="your@email.com" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" for="password">Password:</label>
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="buttons">
            <Button variant='primary' disabled={!username || !password} onClick={loginAccount}>Login</Button>
            <Button variant='secondary' disabled={!username || !password} onClick={createAccount}>Create Account</Button>
            <Button variant='outline-dark' disabled={!username || !password} onClick={loginDeveloper}>Developer Login</Button>
            </div>
        <NavLink to="/">Back</NavLink>
    </div>
  );
}
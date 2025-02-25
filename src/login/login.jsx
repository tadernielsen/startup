import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function loginAccount() {
    console.log('Logging in with:',
      '\nUsername:', username,
      '\nPassword:', password);
    localStorage.setItem('username', username);
  }

  function createAccount() {
    console.log('Creating account with:',
      '\nUsername:', username,
      '\nPassword:', password);
    localStorage.setItem('username', username);
  }

  function loginDeveloper() {
    console.log('Logging in as developer with:',
      '\nUsername:', username,
      '\nPassword:', password);
    localStorage.setItem('username', username);
  }

  return (
    <main className="loginPage">
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
    </main>
  );
}
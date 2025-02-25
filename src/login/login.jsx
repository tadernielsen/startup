import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { NavLink } from 'react-router-dom';

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
        <form method="get" action="index.html">
            <div className="input-group mb-3">
                <label className="input-group-text" for="username">Username:</label>
                <input className="form-control" type="text" id="username" placeholder="your@email.com" required />
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" for="password">Password:</label>
                <input className="form-control" type="password" id="password" placeholder="Password" required />
            </div>
            <div className="buttons">
              <NavLink to="/" type="submit" className="btn btn-primary btn-sm">Login</NavLink>
              <NavLink to="/" type="submit" className="btn btn-secondary btn-sm">Create Account</NavLink>
              <NavLink to="/" type="submit" className="btn btn-outline-dark btn-sm">Developer Login</NavLink>
            </div>
        </form>
        <NavLink to="/">Back</NavLink>
      </div>
    </main>
  );
}
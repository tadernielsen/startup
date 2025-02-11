import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export function Login() {
  return (
    <main className="loginPage">
      <div className="login">
        <h1>Login</h1>
        <form method="get" action="index.html">
            <div className="input-group mb-3">
                <label className="input-group-text" for="username">Username:</label>
                <input className="form-control" type="text" id="username" placeholder="your@email.com" required />
            </div>
            <br />
            <div className="input-group mb-3">
                <label className="input-group-text" for="password">Password:</label>
                <input className="form-control" type="password" id="password" placeholder="Password" required />
            </div>
            <br />
            <div className="buttons">
              <button type="submit" className="btn btn-primary btn-sm">Login</button>
              <button type="submit" className="btn btn-secondary btn-sm">Create Account</button>
              <button type="submit" className="btn btn-outline-dark btn-sm">Developer Login</button>
            </div>
        </form>
        <a href="index.html">Back</a>
      </div>
    </main>
  );
}
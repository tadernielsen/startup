import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

import { UnAuthenticated } from './unAuthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({userName, userType, authState, AuthChange}) {
  return (
    <main className="loginPage">
      {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} userType={userType} onLogout={() => AuthChange(userName, userType = "normal", AuthState.Unauthenticated)} />
      )}
      {authState === AuthState.Unauthenticated && (
        <UnAuthenticated userName={userName} userType={userType} onLogin={(loginUserName, loginType) => {AuthChange(loginUserName, loginType, AuthState.Authenticated); }} />
      )}
    </main>
  );
}
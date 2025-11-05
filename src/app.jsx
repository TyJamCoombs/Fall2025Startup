import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Vote } from './vote/vote';
import {Excuse} from './getExcuse/getExcuse';
import { AuthState } from './login/authState';

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <div className="navbar-brand">
            Caddietud<sup>&reg;</sup>
          </div>
          <menu className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="vote">
                Vote
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="getExcuse">
                Excuse
              </NavLink>
            </li>
          </menu>

          <div className="headerButton">
            <NavLink className="nav-link" to="login">              
                <button type="submit">Login</button>                
            </NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path = '/login' element={<Login userName={userName} authState={authState} onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />}/>
        <Route path = '/vote' element={<Vote />}/>
        <Route path = '/getExcuse' element={<Excuse />}/>
        <Route path='*' element={<NotFound />} />
        </Routes>

      </main>

      <footer>
        <div className="container-fluid">
          <a href="https://github.com/TyJamCoombs/Fall2025Startup">GitHub</a>
        </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
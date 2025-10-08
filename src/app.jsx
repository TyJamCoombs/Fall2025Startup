import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default function App() {
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
        <Route path = '/login' element={<Login />}/>
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
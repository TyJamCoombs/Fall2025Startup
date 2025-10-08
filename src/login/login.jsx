import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './login.css';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div className ="loginBox">
        <div className ="loginSec">
              <div className = "inputBoxes">
                <div>
                  <span>Email:</span>
                  <input type="text" placeholder="your@email.com" />
                </div>
                <div>
                  <span>Password:</span>
                  <input type="password" placeholder="password" />
                </div>          
              </div>
            <div className = "buttonConfig">
              <NavLink className="nav-link" to="/">
                  <button type="submit">Login</button>
                  <button type="submit">Create</button>
              </NavLink>
            </div>
        </div>
      </div>
    </main>
  );
}
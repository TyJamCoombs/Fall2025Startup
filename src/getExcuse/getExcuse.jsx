import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './getExcuse.css';

export function Excuse() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div className ="excudeConfig">
        <div className ="selectExcuse">
        <h1>Select type of excude:</h1>
        <button type="submit">Sand trap</button>
        <button type="submit">Choked it</button>
        <button type="submit">Water Trap</button>
        <button type="submit">Hit a house</button>        
        </div>
    </div>
    <div className ="excudeBConfig">
        <div className ="ExcuseBox">
        <h1>Excuses</h1>
        <ul className="list-group">
            <li className="list-group-item">placeholder: for websocket</li>
            <li className="list-group-item">One</li>
            <li className="list-group-item">Two</li>
            <li className="list-group-item">Three</li>
            <li className="list-group-item">Four</li>
        </ul>
        </div>
    </div>
    </main>
  );
}
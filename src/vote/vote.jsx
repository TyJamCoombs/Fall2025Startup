import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './vote.css';

export function Vote() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div className ="sectionTitle">
        <h2>Create Excuse</h2>
    </div>
    <div className ="excusesCreateConfig">
        <div class="excuseCreate d-flex gap-2">
            <input type="text" class="form-control" placeholder="Enter Excuse here" />
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </div>
    <div className ="sectionTitle">
        <h2>Top Excuses</h2>
    </div>
    <div className ="excusesConfig">
        <div className = "rankedExcuses">
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
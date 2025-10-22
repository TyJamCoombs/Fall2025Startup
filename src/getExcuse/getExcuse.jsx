import React, { useState } from 'react';
import { GetRandomExcuses } from './getExcuseHelper.js';
import './getExcuse.css';

export function Excuse() {
  const [excuses, setExcuses] = useState([]);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="excudeConfig">
        <div className="selectExcuse">
          <h1>Select type of excuse:</h1>
          <button onClick={() => setExcuses(GetRandomExcuses('sandtrap'))}>Sand trap</button>
          <button onClick={() => setExcuses(GetRandomExcuses('choked'))}>Choked it</button>
          <button onClick={() => setExcuses(GetRandomExcuses('water'))}>Water Trap</button>
          <button onClick={() => setExcuses(GetRandomExcuses('house'))}>Hit a house</button>
        </div>
      </div>

      <div className="excudeBConfig">
        <div className="ExcuseBox">
          <h1>Excuses</h1>
          <ul className="list-group">
            {excuses.length === 0 ? (
              <li className="list-group-item text-muted">
                Press a button to see excuses
              </li>
            ) : (
              excuses.map((excuse, index) => (
                <li key={index} className="list-group-item">
                  {excuse}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
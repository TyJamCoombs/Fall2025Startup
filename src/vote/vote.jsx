import React, { useState } from 'react';
import './vote.css';

export function Vote() {
  const [excuse, setExcuse] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  const handleChange = (e) => setExcuse(e.target.value);

  const handleSubmit = () => {
    if (excuse.trim() !== '') {
      setLeaderboard((prev) => [...prev,{ text: excuse.trim(), user: 'PlaceHolder for user' }]);
      setExcuse('');
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="sectionTitle">
        <h2>Create Excuse</h2>
      </div>

      <div className="excusesCreateConfig">
        <div className="excuseCreate d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Excuse here"
            value={excuse}
            onChange={handleChange}
          />
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className="sectionTitle">
        <h2>Top Excuses</h2>
      </div>

      <div className="excusesConfig">
        <div className="rankedExcuses">
          <ul className="list-group">
            {leaderboard.length === 0 ? (
              <li>
                Placeholder for getting excuses from the server
              </li>
            ) : (
              leaderboard.map((item, index) => (
                <li key={index} className="list-group-item">
                  {index + 1}. "{item.text}" -{item.user}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
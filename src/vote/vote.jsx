import React, { useState, useEffect } from 'react';
import './vote.css';

export function Vote() {
  const [excuse, setExcuse] = useState('');
  const [leaderboard, setLeaderboard] = useState({});

  // Fetch excuses from backend on component mount
  useEffect(() => {
    fetch('/api/excuses', {
      method: 'GET',
      credentials: 'include', // ensures cookies are sent for auth
    })
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error('Error fetching excuses:', err));
  }, []);

  const handleChange = (e) => setExcuse(e.target.value);

  const handleSubmit = () => {
  if (excuse.trim() !== '') {
    fetch('/api/excuse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text: excuse.trim() }),
    })
      .then((res) => {
        if (!res.ok) {
          console.warn('Non-OK response:', res.status);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
          setExcuse('');
        } else {
          console.warn('Unexpected response format:', data);
        }
      })
      .catch((err) => {
        console.error('Error submitting excuse:', err);
      });
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
            {Array.isArray(leaderboard) ? (
              leaderboard.length === 0 ? (
                <li>No excuses yet</li>
              ) : (
                leaderboard.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {index + 1}. "{item.text}" - {item.user}
                  </li>
                ))
              )
            ) : (
              <li>Please sign in to view and vote</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
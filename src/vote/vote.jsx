import React, { useState, useEffect } from 'react';
import './vote.css';

export function Vote() {
  const [excuse, setExcuse] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('/api/excuses', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
        }
      })
      .catch((err) => console.error('Error fetching excuses:', err));

    const socket = new WebSocket('ws://localhost:4000');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      console.log('WS message:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        }
      } catch (err) {
        console.error('Bad WS message:', event.data);
      }
    };

    return () => socket.close();
  }, []);

  const handleChange = (e) => setExcuse(e.target.value);

  const handleSubmit = () => {
    if (excuse.trim() !== '') {
      fetch('/api/excuse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: excuse.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setLeaderboard(data);
          }
        })
        .catch((err) => console.error('Error submitting excuse:', err));
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
              <li>No excuses yet</li>
            ) : (
              leaderboard.map((item, index) => (
                <li key={index} className="list-group-item">
                  {index + 1}. "{item.text}" - {item.user}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
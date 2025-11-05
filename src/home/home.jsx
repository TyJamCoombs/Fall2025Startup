import React from 'react';
import './home.css';

fetch('https://api.adviceslip.com/advice')
  .then(res => res.json())
  .then(data => {
    document.getElementById('advice').innerText = data.slip.advice;
  });


export function Home() {
  return (
    <main className="container-fluid bg-secondary text-center">
        <div class="tip">
        <h1>Tip of the day:</h1>
        <div id="advice">Loading advice...</div>
        <h4>-If you think hard enough you can apply it to golf</h4>
        </div>
    </main>
  );
}
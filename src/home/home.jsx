import React from 'react';
import './home.css';

fetch('https://api.adviceslip.com/advice')
  .then(res => res.json())
  .then(data => {
     const doc = document.getElementById('advice');
     if(doc){
      doc.innerText = data.slip.advice;
     }
  });


export function Home() {
  return (
    <main className="container-fluid bg-secondary text-center">
        <div className="tip">
        <h1>Tip of the day:</h1>
        <div id="advice">Loading advice...</div>
        <h6>-If you think hard enough you can apply it to golf</h6>
        </div>
    </main>
  );
}
let leaderboard = ["Enter excuse to view excuses"];

const input = document.getElementById("entryInput");
const button = document.getElementById("submitBtn");
const leaderboardList = document.getElementById("leaderboard");

let port = window.location.port;
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
socket.onopen = () => {
  console.log("Connected to WebSocket from front end");
};

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log("WS message received:", data);

    if (Array.isArray(data.leaderboard)) {

      leaderboard = data.leaderboard.map(e => `${e.text} - ${e.user ?? ''}`);
      renderLeaderboard();
    }
  } catch (err) {
    console.log("Bad Message:", event.data);
  }
};

function renderLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboard.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry}`;
    leaderboardList.appendChild(li);
  });
}

button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    socket.send(JSON.stringify({ text: value }));
    input.value = "";
  }
});
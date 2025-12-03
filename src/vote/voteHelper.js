// Keep a separate array for the data
let leaderboard = ["Enter excuse to view excuses"];

const input = document.getElementById("entryInput");
const button = document.getElementById("submitBtn");
const leaderboardList = document.getElementById("leaderboard");

const socket = new WebSocket("ws://localhost:3000");
socket.onopen = () => {
  console.log("Connected to WebSocket from front end");
};

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (Array.isArray(data.leaderboard)) {
      // Update the array, not the DOM element
      leaderboard = data.leaderboard.map(e => e.text ?? e);
      renderLeaderboard();
    } else if (data.entry) {
      leaderboard.push(data.entry);
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
    socket.send(JSON.stringify({ entry: value }));
    input.value = "";
  }
});
let excusesRanked = ["Enter excuse to view excuses"];

const input = document.getElementById("entryInput");
const button = document.getElementById("submitBtn");
const leaderboardList = document.getElementById("leaderboard");

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
    leaderboard.push(value);
    renderLeaderboard();
    input.value = "";
  }
});

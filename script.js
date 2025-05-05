const size = 5;
let cells = [];
let score = 0;
let timeLeft = 120;
let timerInterval;

function createBoard() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  cells = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.onclick = () => toggle(r, c, true);
      container.appendChild(cell);
      cells.push(cell);
    }
  }

  randomizeBoard();
  startTimer();
}

function toggle(row, col, check = false) {
  const positions = [
    [row, col],
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1]
  ];
  positions.forEach(([r, c]) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      const index = r * size + c;
      cells[index].classList.toggle("toggled");
    }
  });
  if (check) checkWin();
}

function randomizeBoard() {
  for (let i = 0; i < size * 2; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    toggle(r, c, false);
  }
}

function checkWin() {
  const allOn = cells.every(cell => cell.classList.contains("toggled"));
  const allOff = cells.every(cell => !cell.classList.contains("toggled"));

  if (allOn || allOff) {
    clearInterval(timerInterval);
    setTimeout(() => {
      const popup = document.getElementById("popup");
      popup.querySelector("p").textContent = allOn
        ? "🎉 You Win! All lights are ON!"
        : "🎉 You Win! All lights are OFF!";
      popup.style.display = "block";
      score++;
      document.getElementById("score").textContent = score;
    }, 200);
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  document.getElementById("timer").textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("popup").querySelector("p").textContent = "⏳ Time's up! Try again.";
      document.getElementById("popup").style.display = "block";
    }
  }, 1000);
}

function resetBoard() {
  cells.forEach(cell => cell.classList.remove("toggled"));
  document.getElementById("popup").style.display = "none";
  createBoard();
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function toggleAddendum() {
  const addendum = document.getElementById("addendum");
  addendum.style.display = addendum.style.display === "none" ? "block" : "none";
}

createBoard();

const hitSound = document.getElementById('hitSound');
const song = document.getElementById('song');

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 30; // Set initial time to 10 seconds
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rest of your JavaScript code...

// Remember to adjust the paths in the <audio> elements to match your project directory structure.
function stopGame() {
  clearInterval(timer); // Clear the interval timer to stop the countdown
  time = 0; // Reset the time to zero
  timerDisplay.textContent = time; // Update the timer display
  song.pause(); // Pause the background music
  return "game stopped"; // Return a message indicating that the game has stopped
}



function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}
function chooseHole(holes) {
  let index = Math.floor(Math.random() * holes.length);
  let hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes); // Call recursively until a different hole is chosen
  }
  lastHole = hole;
  return hole;
}


function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}

function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay) {
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

function toggleVisibility(hole) {
  hole.classList.toggle('show');
}

function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time >= 0) {
    timerDisplay.textContent = time;
    time--;
  } else {
    stopGame();
  }
}


function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function whack(event) {
  if (!event.isTrusted) return; // Prevents fake click events
  updateScore();
  hitSound.play(); // Play the hit sound
}

function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });
}

function setDuration(duration) {
  time = duration;
  return time;
}

function startGame() {
  clearScore();
  setDuration(30);
  startTimer();
  song.loop = true; // Ensure the background song loops
  song.play(); // Start playing the background song
  return showUp();
}

function gameOver() {
  if (time <= 0) {
    stopGame();
  } else {
    return showUp();
  }
}


startButton.addEventListener("click", startGame);

// Calling setEventListeners to add click event listeners to moles
setEventListeners();


// Exporting functions for testing purposes
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.toggleVisibility = toggleVisibility;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.updateTimer = updateTimer;
window.startTimer = startTimer;
window.whack = whack;
window.setEventListeners = setEventListeners;
window.setDuration = setDuration;
window.stopGame = stopGame;
window.startGame = startGame;

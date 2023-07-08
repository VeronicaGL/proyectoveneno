const canvasId = "game-veneno";
const canvas = document.getElementById(canvasId);
const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {game.onKeyDown(event)});
window.addEventListener("keyup", (event) => {game.onKeyUp(event)});

const startBtn = document.getElementById("btn-start");
startBtn.addEventListener("click", () => {
  canvas.classList.remove("hidden");
  const initPanel = document.querySelector(".init-panel")
  initPanel.classList.add("hidden");
  game.start();
})

const audio = new Audio("/assets/mp3/song-venenopatupiel.mp3");
function playMusic() {
  audio.play();
  adjustVolume(0.2);
}
function adjustVolume(volume) {
  audio.volume = volume;
}
function pauseMusic() {
  audio.pause();
}

/*document.getElementById("stop").onclick = () => {
  game.stop();
};*/
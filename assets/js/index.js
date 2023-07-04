const canvasId = "game-veneno";
const canvas = document.getElementById(canvasId);
const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {game.onKeyDown(event)});
window.addEventListener("keyup", (event) => {game.onKeyUp(event)});

document.getElementById("start").onclick = () => {
  game.start();
};

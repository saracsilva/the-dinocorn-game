//Canvas
const canvas = document.querySelector(`canvas`);
canvas.style.border = `2px solid black`;
const ctx = canvas.getContext(`2d`);
const startScreen = document.querySelector(".start-screen");
let keys = {};
// Variables
// Game definitions
const floor_01 = new Image();
floor_01.src = "../img/floor.png";
const floor_02 = new Image();
floor_02.src = "../img/floor.png";
const background = new Image();
background.src = "../img/background.png";

let isGameOver = false;
let gameId = 0;
let gravity;
// Dinocorn definitions
let player;
const dinoCorn = new Image();
dinoCorn.src = "../img/dino_walk_01.png";

class Dinocorn {
  constructor() {
    this.dinoX = 50;
    this.dinoY = canvas.height - 180;
    this.dinoWidth = 100;
    this.dinoHeight = 160;
    this.vY = 0;
    //this.gravity = 0.5;
    this.originalHeight = this.dinoHeight;
    this.grounded = false;
    this.jumpTimer = 0;
  }
  Animate() {
    document.addEventListener("keydown", (event) => {
      console.log(event);
      if (event.code === "Space") {
        console.log("We are going right!");
        this.Jump();
      }
    });
    document.addEventListener("keyup", () => {
      this.jumpTime = 0;
    });

    this.dinoY += this.vY;
    // gravity
    if (this.dinoY + this.dinoHeight < canvas.height) {
      this.vY += gravity;
      this.grounded = false;
    } else {
      this.vY = 0;
      this.grounded = true;
      this.dinoY = canvas.height - this.dinoHeight;
    }
  }
  Jump() {
    //this.vY = -25;
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.vY = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.vY = -this.jumpForce - this.jumpTimer / 50;
    }
  }
  /* move() {
    this.dinoY += this.vY;
    this.vY += this.gravity;
    this.dinoY = constrain(this.dinoY, 0, canvas.height - 50);
  } */
  Draw() {
    ctx.drawImage(
      dinoCorn,
      this.dinoX,
      this.dinoY,
      this.dinoWidth,
      this.dinoHeight
    );
  }
}
/* let dinocornX = 50;
let dinocornY = canvas.height - 180;
const dinoHeight = 160;
const dinoWidth = 100; */
// Dino Jump Definitions
/* let jumpForce = 15;
let dirY = 0;
let grounded = false;
let jumpTime = 0; */
//let isJumping = false;
//floor definitions
let floorW = 0;
let floorW2 = canvas.width;

const animate = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(floor_01, floorW, canvas.height - 100, canvas.width + 50, 20);
  ctx.drawImage(floor_02, floorW2, canvas.height - 100, canvas.width + 50, 20);
  //player.move();
  player.Draw();
  player.Animate();
  console.log("test");
  // Make Dino Jump

  // Make the floor move

  floorW -= 3;
  floorW2 -= 3;
  if (floorW < -canvas.width) {
    floorW = canvas.width;
  }
  if (floorW2 < -canvas.width) {
    floorW2 = canvas.width;
  }
  if (isGameOver) {
    cancelAnimationFrame(gameId);
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate);
  }
  // Gravity
  /* if (player.dinoY + player.dinoHeight < canvas.height) {
    player.vY += gravity;
    grounded = false;
  } else {
    player.vY = 0;
    grounded = true;
    player.dinoY = canvas.height - player.dinoHeight;
  }
  player.dinoY += player.vY; */
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
    //song.play()
    startGame();
  };
  function startGame() {
    startScreen.style.display = "none";
    gravity = 1;
    player = new Dinocorn();
    animate();
  }
};

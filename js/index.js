//Canvas
const canvas = document.querySelector(`canvas`);
canvas.style.border = `2px solid black`;
const ctx = canvas.getContext(`2d`);
const startScreen = document.querySelector(".start-screen");
let keys = {};
// Variables
// key pressed
let registerKeyPress = 0;
let amountOfPressedAllowed = 5;
// Game definitions
const floor_01 = new Image();
floor_01.src = "../img/floor.png";
const floor_02 = new Image();
floor_02.src = "../img/floor.png";
const background = new Image();
background.src = "../img/background.png";
const obstacle = new Image();
obstacle.src = "../img/cactus_01.png";

let isGameOver = false;
let gameId = 0;
let gravity;
// Dinocorn definitions
let player;
const dinoCorn = new Image();
dinoCorn.src = "../img/dino_walk_01.png";
let jumping = false;
class Dinocorn {
  constructor() {
    this.dinoX = 50;
    this.dinoY = canvas.height - 180;
    this.dinoWidth = 100;
    this.dinoHeight = 160;
    this.originalHeigh = this.dinoY;
    this.vY = 0;
    this.gravity = 10;

    this.jumpTimer = 0;
    this.grounded = false;
    this.jumpForce + 15;
  }

  Jump() {
    this.vY = -8;
    console.log("yes");
  }
  Move() {
    //this.dinoY = -canvas.height + 600;
    if (this.dinoY + this.dinoHeight < canvas.height && jumping == false) {
      this.dinoY += this.gravity;
    }
    if (this.dinoY < -canvas.height + 600) {
      this.dinoY += this.gravity;
      this.vY = 0;
      jumping == false;
    } else {
      this.dinoY += this.vY;
    }
    /*  this.dinoY += this.vY;
    this.vY += this.gravity;
    if (this.dinoY > canvas.height || this.dinoY < this.originalHeigh - 180) {
      this.dinoY = this.originalHeigh;
    } */
  }
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
// Obstacles
class Obstacle {
  constructor() {
    this.x = 50;
    this.y = canvas.height - 180;
    this.width = 100;
    this.height = 160;
    this.dX = -gameSpeed;
  }
  Update() {
    this.x += this.dX;
    this.Draw;
    this.dX = -gameSpeed;
  }
  Draw() {
    ctx.drawImage(obstacle, this.x, this.y, this.width, this.height);
  }
}

//floor definitions
let floorW = 0;
let floorW2 = canvas.width;

const animate = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(floor_01, floorW, canvas.height - 100, canvas.width + 50, 20);
  ctx.drawImage(floor_02, floorW2, canvas.height - 100, canvas.width + 50, 20);

  player.Draw();
  player.Move();
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
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
    //song.play()
    startGame();
  };
  function startGame() {
    startScreen.style.display = "none";

    player = new Dinocorn();
    animate();
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        console.log("jump");
        jumping = true;
        registerKeyPress++;
        player.Jump();
        if (registerKeyPress >= 5) {
          player.vY = 0;
          jumping = false;
          player.jumpTimer = 0;
        }
      }
    });
    document.addEventListener("keyup", () => {
      player.vY = 0;
      jumping = false;

      registerKeyPress = 0;
    });
  }
};

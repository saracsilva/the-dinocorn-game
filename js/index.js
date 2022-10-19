//Canvas
const canvas = document.querySelector(`canvas`);
canvas.style.border = `2px solid black`;
const ctx = canvas.getContext(`2d`);
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector("#game-screen");
const restartScreen = document.querySelector(".restart-screen");
// Score
let score = document.querySelector(".score");
let scoreValue = 0;
let highscore = document.querySelector(".highScore");

// Variables
// key pressed
let registerKeyPress = 0;
let amountOfPressedAllowed = 4;
// Game definitions
const floor_01 = new Image();
floor_01.src = "../img/floor.png";
const floor_02 = new Image();
floor_02.src = "../img/floor.png";
const background = new Image();
background.src = "../img/background.png";
const obstacle_01 = new Image();
obstacle_01.src = "../img/cactus_01.png";
const obstacle_02 = new Image();
obstacle_02.src = "../img/cactus_02.png";
const dino_frame_count = 2;
const frame_time = 100;

let isGameOver = false;
let gameId = 0;
let gravity;
let gameSpeed;
let obstacles = [];

// Dinocorn definitions
let player;
const dinoCorn_01 = new Image();
dinoCorn_01.src = "../img/dino_walk_01.png";
const dinoCorn_02 = new Image();
dinoCorn_02.src = "../img/dino_walk_02.png";
const dinoCorn_jump = new Image();
dinoCorn_jump.src = "../img/dino_jump.png";

let jumping = false;

class Dinocorn {
  constructor() {
    this.dinoX = 50;
    this.dinoY = canvas.height - 180;
    this.dinoWidth = 100;
    this.dinoHeight = 160;
    this.originalHeigh = this.dinoY;
    this.vY = 0;
    this.gravity = 8;

    this.jumpTimer = 0;
    this.grounded = false;
    this.jumpForce + 15;
    this.groundLimit = canvas.height - 180;
  }

  Jump() {
    this.vY += -8;
    jumping = true;

    console.log("yes");
    console.log(jumping);
  }
  Move() {
    let timeinAir = 0;
    //this.dinoY = -canvas.height + 600;
    if (this.dinoY + this.dinoHeight < canvas.height && jumping == false) {
      this.dinoY += this.gravity;
    }
    if (jumping === true) {
      console.log("hello");
      this.dinoY += this.vY;
    } else if (this.dinoY + this.dinoHeight > 580 && jumping == false) {
      this.dinoY = canvas.height - 180;
      this.vY = 0;
    }
    if (this.dinoY < 100) {
      jumping = false;
    }
  }
  Draw() {
    if (jumping) {
      ctx.drawImage(
        dinoCorn_jump,
        this.dinoX,
        this.dinoY,
        this.dinoWidth,
        this.dinoHeight
      );
    } /* if (gameId % 2 === 0) */ else {
      ctx.drawImage(
        dinoCorn_01,
        this.dinoX,
        this.dinoY,
        this.dinoWidth,
        this.dinoHeight
      );

      setInterval(function () {
        ctx.drawImage(
          dinoCorn_02,
          this.dinoX,
          this.dinoY,
          this.dinoWidth,
          this.dinoHeight
        );
      }, 100);
    } /*  else {
      ctx.drawImage(
        dinoCorn_02,
        this.dinoX,
        this.dinoY,
        this.dinoWidth,
        this.dinoHeight
      );
    } */
  }
}

// Obstacles

class Obstacle {
  constructor(type) {
    this.x = 1500;
    this.y = canvas.height - 180;
    this.width = 100;
    this.height = 160;
    // this.dX = -gameSpeed;
    this.type = type;
  }
  /* Update() {
    this.x += this.dX;
    this.Draw;
    this.dX = -gameSpeed;
  } */
  Draw() {
    ctx.drawImage(this.type, this.x, this.y, this.width, this.height);
    //ctx.drawImage(obstacle_02, this.x, this.y, this.width, this.height);
  }
}

function RandomObstRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// Obstacles Creation definition
/* let inicialTimeOb = 200;
let intervalTimeOb = 200; */
let obstaclesFrequency = 0;
//floor definitions
let floorW = 0;
let floorW2 = canvas.width;

function detectCollision(obstacle) {
  return (
    player.dinoX + player.dinoWidth - 20 > obstacle.x &&
    player.dinoY + player.dinoHeight > obstacle.y &&
    player.dinoX < obstacle.x + obstacle.width - 50
  );
}
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(floor_01, floorW, canvas.height - 100, canvas.width + 50, 20);
  ctx.drawImage(floor_02, floorW2, canvas.height - 100, canvas.width + 50, 20);

  player.Draw();
  player.Move();

  console.log("test");

  obstaclesFrequency++;

  if (gameId % 500 == 0) {
    //Draw an obstacle

    let type = RandomObstRange(0, 1);
    if (type === 0) {
      type = obstacle_01;
    } else if (type === 1) {
      type = obstacle_02;
    }
    let newObstacle = new Obstacle(type);
    obstacles.push(newObstacle);
    console.log(obstacles);
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 6;
    obstacles[i].Draw();

    if (detectCollision(obstacles[i])) {
      alert("BOOOOOMM!");
      isGameOver = true;
      obstaclesFrequency = 0;

      obstacles = [];
      player = null;
      scoreValue = 0;
      score.innerHTML = 0;
    }
  }
  // Make obstacles

  // Make the floor move

  floorW -= 3;
  floorW2 -= 3;
  if (floorW < -canvas.width) {
    floorW = canvas.width;
  }
  if (floorW2 < -canvas.width) {
    floorW2 = canvas.width;
  }
  //request animation
  if (isGameOver) {
    cancelAnimationFrame(gameId);
    restartScreen.classList.remove(`hidden`);
    gameScreen.classList.add("hidden");
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate);
  }
  scoreValue++;

  score.innerHTML = scoreValue;
  if (scoreValue > highscore.innerText) {
    highscore.innerHTML = scoreValue;
  }
  console.log(highscore.innerHTML);
  //scoreValue = Number(score.innerText);
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
    //song.play()
    startGame();
  };
  document.getElementById("restart-button").onclick = () => {
    console.log("restarting");
    //song.play()
    isGameOver = false;

    startGame();
  };
  function startGame() {
    restartScreen.classList.add("hidden");
    startScreen.style.display = "none";
    gameScreen.classList.remove("hidden");
    //gameSpeed = 3;

    //highscore = 0;

    /* scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
    highscoreText = new Text(
      "Highscore: " + highscore,
      canvas.width - 25,
      25,
      "right",
      "#212121",
      "20"
    ); */
    player = new Dinocorn();
    animate();

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        console.log("jump");
        jumping = true;
        registerKeyPress++;

        player.Jump();
        if (registerKeyPress >= amountOfPressedAllowed) {
          player.vY = 0;
          jumping = false;
          player.jumpTimer = 0;
        }
      }
    });
    document.addEventListener("keyup", () => {
      player.vY = 0;

      jumping = false;

      setTimeout(() => (registerKeyPress = 0), "300");
    });
  }
};

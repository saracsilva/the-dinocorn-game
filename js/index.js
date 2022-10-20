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
/* function countRestartButton() {
  let count = 0;
  count += 1;
  if (count > 0) {
    player.vY = 0;
  }
} */

// Variables
//Dino image animation
let frameDino = 0;
setInterval(function () {
  frameDino += 1;
}, 120);
// key pressed
let registerKeyPress;
let amountOfPressedAllowed = 5;
// Game definitions
const floor_01 = new Image();
floor_01.src = "../img/floor_02.png";
const floor_02 = new Image();
floor_02.src = "../img/floor_02.png";
const background = new Image();
background.src = "../img/background.png";
const obstacle_01 = new Image();
obstacle_01.src = "../img/cactus_01.png";
const obstacle_02 = new Image();
obstacle_02.src = "../img/cactus_02.png";
const obstacle_03 = new Image();
obstacle_03.src = "../img/obst_03.png";
const obstacle_04 = new Image();
obstacle_04.src = "../img/obst_04.png";
const obstacle_05 = new Image();
obstacle_05.src = "../img/obst_05.png";
/* const dino_frame_count = 2;
const frame_time = 100; */

let isGameOver = false;
let gameId = 0;
let gravity;
let gameSpeed = 3;
let obstacles = [];

// Dinocorn definitions
let airTime = 0;
let player;
const dinoCorn_01 = new Image();
dinoCorn_01.src = "../img/dino_walk_01.png";
const dinoCorn_02 = new Image();
dinoCorn_02.src = "../img/dino_walk_02.png";
const dinoCorn_jump = new Image();
dinoCorn_jump.src = "../img/dino_jump.png";
const dinoCorn_shrink = new Image();
dinoCorn_shrink.src = "../img/dino_shrink.png";
let isShrinking = false;

let jumping = false;

class Dinocorn {
  constructor() {
    this.dinoX = 50;
    this.dinoY = canvas.height - 180;
    this.dinoWidth = 100;
    this.dinoHeight = 160;

    this.vY = 0;
    this.gravity = 8;
  }

  Jump() {
    this.vY = -10;
    jumping = true;
    /*  if (registerKeyPress >= amountOfPressedAllowed) {
      //player.vY = 0;
      jumping = false;
      //console.log(this.vY, gameSpeed, jumping, "yes");
    } */
  }
  Move() {
    //this.dinoY = -canvas.height + 600;
    if (this.dinoY + this.dinoHeight < canvas.height && jumping == false) {
      this.dinoY += this.gravity;
      //airTime++;
    }
    if (jumping === true) {
      this.dinoY += this.vY;
    } else if (this.dinoY + this.dinoHeight > 580 && jumping == false) {
      this.dinoY = canvas.height - 180;
      this.vY = 0;
    }
    if (this.dinoY < 100) {
      this.dinoY += this.gravity;

      setTimeout((this.vY = 0), 100);
      //this.vY = 0;
      jumping = false;
    }

    /*  if (airTime > 20) {
      this.dinoY += this.gravity;
      airTime = 0;
    } */
    /*  if (registerKeyPress > 2) {
      this.dinoY += this.gravity;
    } */
  }

  Draw() {
    if (isShrinking) {
      ctx.drawImage(
        dinoCorn_shrink,
        this.dinoX,
        this.dinoY + 80,
        this.dinoWidth + 20,
        80
      );
    } else if (jumping) {
      ctx.drawImage(
        dinoCorn_jump,
        this.dinoX,
        this.dinoY,
        this.dinoWidth,
        this.dinoHeight
      );
    } else {
      if (frameDino % 2 === 0) {
        ctx.drawImage(
          dinoCorn_01,
          this.dinoX,
          this.dinoY,
          this.dinoWidth,
          this.dinoHeight
        );
      } else {
        ctx.drawImage(
          dinoCorn_02,
          this.dinoX,
          this.dinoY,
          this.dinoWidth,
          this.dinoHeight
        );
      }
    }
  }
}

// Obstacles

class Obstacle {
  constructor(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //this.dX = -gameSpeed;
    this.type = type;
  }

  Draw() {
    ctx.drawImage(this.type, this.x, this.y, this.width, this.height);
  }
}

function RandomObstRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// Obstacles Creation definition

let obstaclesFrequency = 500;
//floor definitions
let floorW = 0;
let floorW2 = canvas.width + 498;

function detectCollision(obstacle) {
  if (isShrinking) {
    return (
      player.dinoY + 80 < obstacle.y + obstacle.height &&
      player.dinoY + player.dinoHeight > obstacle.y &&
      player.dinoX + player.dinoWidth - 20 > obstacle.x &&
      player.dinoX < obstacle.x + obstacle.width - 50
    );
  } else {
    return (
      player.dinoY < obstacle.y + obstacle.height &&
      player.dinoY + player.dinoHeight > obstacle.y &&
      player.dinoX + player.dinoWidth - 20 > obstacle.x &&
      player.dinoX < obstacle.x + obstacle.width - 50
    );
  }
}
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(floor_01, floorW, canvas.height - 500, canvas.width + 500, 440);
  ctx.drawImage(
    floor_02,
    floorW2,
    canvas.height - 500,
    canvas.width + 500,
    440
  );

  player.Draw();
  player.Move();

  if (gameId % 500 == 0) {
    //Draw an obstacle
    // Make obstacles
    let type = RandomObstRange(0, 4);
    let x;
    let y;
    let width;
    let height;

    if (type === 0) {
      type = obstacle_01;
      x = 1900;
      y = canvas.height - 180;
      width = 100;
      height = 160;
    } else if (type === 1) {
      type = obstacle_02;
      x = 1900;
      y = canvas.height - 180;
      width = 100;
      height = 160;
    } else if (type === 2) {
      type = obstacle_03;
      x = 1900;
      y = canvas.height - 200;
      width = 80;
      height = 70;
    } else if (type === 3) {
      type = obstacle_04;
      x = 1900;
      y = canvas.height - 100;
      width = 100;
      height = 80;
    } else if (type === 4) {
      type = obstacle_05;
      x = 1900;
      y = canvas.height - 180;
      width = 100;
      height = 160;
    }
    let newObstacle = new Obstacle(x, y, width, height, type);
    obstacles.push(newObstacle);
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= gameSpeed;
    obstacles[i].Draw();

    if (detectCollision(obstacles[i])) {
      isGameOver = true;
    }
  }

  // Make the floor move

  floorW -= 3;
  floorW2 -= 3;
  if (floorW < -canvas.width - 500) {
    floorW = canvas.width + 498;
  }
  if (floorW2 < -canvas.width - 500) {
    floorW2 = canvas.width + 498;
  }
  //request animation
  if (isGameOver) {
    cancelAnimationFrame(gameId);
    restartScreen.classList.remove(`hidden`);
    gameScreen.classList.add("hidden");
    obstaclesFrequency = 0;
    //player.vY = 0;
    obstacles = [];
    // player = null;
    scoreValue = 0;
    score.innerHTML = 0;
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate);
  }
  scoreValue++;
  score.innerHTML = scoreValue;
  if (scoreValue > highscore.innerText) {
    highscore.innerHTML = scoreValue;
  }
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    //song.play()
    startGame();
  };

  document.getElementById("restart-button").onclick = () => {
    //song.play()
    //countRestartButton();
    obstacles = [];

    registerKeyPress = 0;
    console.log(amountOfPressedAllowed);
    // player = null;
    scoreValue = 0;
    score.innerHTML = 0;
    jumping = false;
    isGameOver = false;
    gameSpeed = 3;
    player.vY = 0;

    startGame();
  };
  function startGame() {
    restartScreen.classList.add("hidden");
    startScreen.style.display = "none";
    gameScreen.classList.remove("hidden");
    registerKeyPress = 0;
    setInterval(function () {
      gameSpeed += 0.05;
    }, 2000);

    player = new Dinocorn();
    player.vY = 0;
    animate();

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        jumping = true;
        registerKeyPress += 1;

        player.Jump();
        if (registerKeyPress >= amountOfPressedAllowed) {
          player.vY = 0;
          jumping = false;
          registerKeyPress = 0;
        }
      }
    });
    document.addEventListener("keyup", () => {
      player.vY = 0;

      jumping = false;

      setTimeout(() => (registerKeyPress = 0), "300");
    });
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowDown") {
        isShrinking = true;
      }
    });
    document.addEventListener("keyup", () => {
      isShrinking = false;
    });
  }
};

# the-dinocorn-game

## Description

The Dinocorn is a game where the player has to jump or get down to not collide with the cactus. flowers and bees.

## MVP (DOM - CANVAS)

_MVP definition here, list of minimum features_

- game has Dinosaur dressed like a unicorn that moves horizontally
- The dinocorn is joing to jump obstacles
- the dinocorn is going to get down
- if the player collide with the obstacles the game is over
- Score
- Highscore
- Increasing difficulty

## Backlog

_List of features you might implement after the MVP_

- catch some type of "weapon" that helps go through the obstacles
- reload time for "weapon"

## Data structure

_List of classes and methods_

## States y States Transitions

_List of states (views) of your game_

- splashScreen
- gameScreen
- gameOverScreen

# index.js

- startGame();

---Obstacles

- Obstacle {
  this.x
  this.y
  this.width
  this.height
  this.type
  Draw()
  }

  - RandomObstRange(){}

  - detectCollision(){}

    ---Dinosaur

- Dinocorn() {

  this.dinoX
  this.dinoY
  this.dinoWidth
  this.dinoHeight
  this.vY
  this.gravity
  Jump()
  Move()
  Draw()

}
-animate()

## Task

_List of tasks in order of priority_

- main - buildDom
- main - buildStartScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- main - buildCanvas
- game - drawCanvas
- game - updateCanvas
- game - draw the dinosaur
- game - move the dinosaur
- game - draw obstacles
- game - make obstacles move
- obstcles - create different types
- game - checkCollision
- game - gameOver

## Links

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/saracsilva/the-dinocorn-game)
[Link Deploy](https://saracsilva.github.io/the-dinocorn-game/)

### Slides

URls for the project presentation (slides)
[Link Slides]()

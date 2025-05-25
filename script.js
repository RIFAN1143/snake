const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;

let snake = [{ x: 9 * boxSize, y: 9 * boxSize }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;

// Add event listeners for touch buttons
document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});
document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});
document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

// Keyboard controls
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols) * boxSize,
    y: Math.floor(Math.random() * rows) * boxSize,
  };
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "DOWN") head.y += boxSize;

  if (head.x < 0) head.x = canvas.width - boxSize;
  if (head.y < 0) head.y = canvas.height - boxSize;
  if (head.x >= canvas.width) head.x = 0;
  if (head.y >= canvas.height) head.y = 0;

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
    score++;
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

const gameInterval = setInterval(draw, 100);

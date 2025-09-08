const board = document.getElementById("gameBoard");
const ctx = board.getContext("2d");
const scoreEl = document.getElementById("score");

const box = 20; // grid size
let snake = [{ x: 200, y: 200 }];
let food = randomFood();
let dx = 0, dy = 0;
let score = 0;

function randomFood() {
  return {
    x: Math.floor(Math.random() * (board.width / box)) * box,
    y: Math.floor(Math.random() * (board.height / box)) * box,
  };
}

function draw() {
  // Clear board
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, board.width, board.height);

  // Snake
  snake.forEach((part, i) => {
    ctx.fillStyle = i === 0 ? "lime" : "lightgreen";
    ctx.fillRect(part.x, part.y, box, box);
  });

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  // Game over
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= board.width || head.y >= board.height ||
    snake.some(p => p.x === head.x && p.y === head.y)
  ) {
    alert("Game Over! Final Score: " + score);
    document.location.reload();
  }

  snake.unshift(head);
}

// Control snake
function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}
document.addEventListener("keydown", changeDirection);

// Run game
setInterval(draw, 120);

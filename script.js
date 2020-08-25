const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winMessageTextElement = document.querySelector("data-win-text");
const table = document.getElementById("table");
const winTextElement = document.getElementById("wintext");
const boxElements = document.querySelectorAll("[data-box]");
let circleTurn;

startGame();

function startGame() {
  circleTurn = false;
  boxElements.forEach((box) => {
    box.addEventListener("click", handleClick, { once: true });
  });
  setTableHoverClass();
}

function handleClick(e) {
  const box = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(box, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  }
  swapTurns();
  setTableHoverClass();
}

function endGame(draw) {
  if (draw) {
    winTextElement.innerHTML = "Draw";
  } else {
    winMessageTextElement.innerHTML = '${circleTurn ? "O" : "X"} Wins!';
  }
  winMessageTextElement.classList.add("show");
}

function placeMark(box, currentClass) {
  box.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setTableHoverClass() {
  table.classList.remove(X_CLASS);
  table.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    table.classList.add(CIRCLE_CLASS);
  } else {
    table.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((index) => {
      return boxElements[index].classList.contains(currentClass);
    });
  });
}

const board = document.querySelector("#board");
const info = document.querySelector("#information");
const reset = document.querySelector("#reset");
const winner = document.querySelector("#winner");
let playedCells = ["", "", "", "", "", "", "", "", ""];

info.textContent = "Kitty goes first";
let addSymbol = "Kitty";
const createBoard = () => {
  playedCells.forEach((_element, index) => {
    const cell = document.createElement("div");
    cell.classList.add("box");
    cell.id = index;
    cell.addEventListener("click", AddSymbol);
    board.append(cell);
  });
};
createBoard();

function AddSymbol(e) {
  const highLight = document.createElement("div");
  highLight.classList.add(addSymbol);
  e.target.append(highLight);
  if (addSymbol === "Kitty") {
    addSymbol = "Spooky";
    e.target.style.background = "rgb(127, 20, 153)";
  } else {
    addSymbol = "Kitty";
    e.target.style.background = "rgb(206, 138, 223";
  }

  info.textContent = "Your turn, " + addSymbol + "!";
  e.target.removeEventListener("click", AddSymbol);
  scoreCheck();
}

function scoreCheck() {
  const allBoxes = document.querySelectorAll(".box");
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winCombinations.forEach((array) => {
    const circleWins = array.every((cell) =>
      allBoxes[cell].firstChild?.classList.contains("Kitty")
    );
    console.log(playedCells);

    if (circleWins) {
      winner.textContent = "Kitty wins!!!";
      info.textContent = "";
      array.forEach((cell) => {
        allBoxes[cell].classList.add("rotate");
      });
      allBoxes.forEach((box) => box.replaceWith(box.cloneNode(true)));
    }
    const crossWins = array.every((cell) =>
      allBoxes[cell].firstChild?.classList.contains("Spooky")
    );
    console.log(playedCells);

    if (crossWins) {
      winner.textContent = "Spooky wins!!!";
      info.textContent = "";
      array.forEach((cell) => {
        allBoxes[cell].classList.add("rotate");
      });
      allBoxes.forEach((box) => box.replaceWith(box.cloneNode(true)));
    }
  });
}
reset.addEventListener("click", () => {
  board.innerHTML = "";
  addSymbol = "Kitty";
  info.textContent = "Kitty goes first";
  winner.textContent = "";
  playedCells = ["", "", "", "", "", "", "", "", ""];
  createBoard();
});

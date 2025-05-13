const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left to bottom-right
  [2, 4, 6], // diagonal from top-right to bottom-left
];

// this array stories the current state of the board
// empty string so all the cells are empty
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";     // current player (first player) starts with X
let running = false  // so no extra clicks after the game.

// starts the game
initialiseGame()

function initialiseGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // this adds click events to each cell
    restartBtn.addEventListener("click", restartGame); // add clikc event listener to restart button
    statusText.textContent = `${currentPlayer}'s turn`;   // shows initial status message of whose go it is / end outcome
    running = true   // thats the game is now active

}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")  // gets the index of the clicked cell (custom attricbute in html)

    if (options[cellIndex] != "" || !running){     // if the cell is already filled, OR the game is over, do nothing
        return;
    }
    updateCell(this, cellIndex);    // update the game and UI
    checkWinner()
}

function updateCell(cell, index) {
    // store the move inthe game state array
    options[index] = currentPlayer;
    // show the move (X or O) on the board
    cell.textContent = currentPlayer
}

function changePlayer() {
    // switch played: if X then O. if O then X
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    // update the status to show whoes go it is
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    // loop through each win condition (row, columns, diagonals)
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // if any of the 3 cells are empty, skip this condition
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {   // if all 3 cells match, someone has won
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        // show who won
        statusText.textContent = `${currentPlayer} wins! `
        running = false; // stop the game
    }
    else if (!options.includes("")) {
        statusText.textContent = "Draw!! ";
        running = false
    } else {    // no winner yet, game continues. switch player
        changePlayer()
    }
}

function restartGame() {
    // resets everything to how it was at the start
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true
}
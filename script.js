
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let gameStatus = document.getElementById('status');

function printBoard() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).innerText = board[i];
  }
}

function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let condition of winConditions) {
    if (board[condition[0]] === player && board[condition[1]] === player && board[condition[2]] === player) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return !board.includes(' ');
}

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.id.split('-')[1]);
  
  // If the cell is already taken, do nothing
  if (board[cellIndex] !== ' ') {
    return;
  }

  // Mark the cell with the current player's symbol
  board[cellIndex] = currentPlayer;
  printBoard();

  // Check for win or tie
  if (checkWin(currentPlayer)) {
    gameStatus.innerText = `Player ${currentPlayer} wins!`;
    setGameOver();
  } else if (checkTie()) {
    gameStatus.innerText = "It's a tie!";
    setGameOver();
  } else {
    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function setGameOver() {
  // Disable all cells after the game is over
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function initGame() {
  board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  currentPlayer = 'X';
  gameStatus.innerText = "";
  printBoard();

  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

printBoard();
initGame();

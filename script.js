const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');
const reset = document.getElementById('reset');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'X';
let moveCount = 0;

function initGame() {
    player1.style.display = 'block';
    player2.style.display = 'block';
    player1.style.color = 'gold';
    player2.style.color = 'bronze';
    reset.style.display = 'none';
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', handleCellClick);
    });
    currentPlayer = 'X';
    moveCount = 0;
}

function handleCellClick(event) {
    const cell = event.target;
    if (cell.innerHTML) return;

    cell.innerHTML = currentPlayer;
    moveCount++;

    if (checkWin()) {
        endGame(`Player ${currentPlayer} wins!`);
    } else if (moveCount === 9) {
        endGame("It's a draw!");
    } else {
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    player1.style.color = currentPlayer === 'X' ? 'gold' : 'white';
    player2.style.color = currentPlayer === 'O' ? 'gold' : 'white';
}

function checkWin() {
    const size = 3; // Size of the board (3x3)
    const board = Array.from(cells).map(cell => cell.innerHTML);

    // Check rows and columns
    for (let i = 0; i < size; i++) {
        if (checkLine(board, i * size, 1, size) || 
            checkLine(board, i, size, size)) {
            return true;
        }
    }

    // Check diagonals
    return checkLine(board, 0, size + 1, size) || 
           checkLine(board, size - 1, size - 1, size);
}

function checkLine(board, start, step, size) {
    const symbol = board[start];
    if (!symbol) return false;

    for (let i = 1; i < size; i++) {
        if (board[start + i * step] !== symbol) {
            return false;
        }
    }
    return true;
}

function endGame(message) {
    alert(message);
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    reset.style.display = 'block';
    player1.style.display = 'none';
    player2.style.display = 'none';
}

reset.addEventListener('click', initGame);

initGame();
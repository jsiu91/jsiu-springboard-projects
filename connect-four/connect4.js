/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard () {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard () {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');

	// Creates the top (head rows) of the board
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	// Creates the first row based on the width
	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.appendChild(headCell);
	}
	htmlBoard.appendChild(top);

	// Creates an extra row based on the height
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol (x) {
	// TODO: write the real version of this, rather than always returning 0
	for (let y = HEIGHT - 1; y >= 0; y--) {
		let td = document.getElementById(`${y}-${x}`);
		if (!td.hasChildNodes()) return y;
	}
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable (y, x) {
	// TODO: make a div and insert into correct table cell
	const div = document.createElement('div');
	const td = document.getElementById(`${y}-${x}`);
	div.classList.add('piece');
	//check if the current player is 1 or 2
	currPlayer === 1 ? div.classList.add('p1') : div.classList.add('p2');
	td.appendChild(div);
}

/** endGame: announce game end */

function endGame (msg) {
	// TODO: pop up alert message
	alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick (evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;
	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}
	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (entireBoardFilled()) return endGame('Tie Game!');
	// switch players
	// TODO: switch currPlayer 1 <-> 2
	currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin () {
	function _win (cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
			([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		// iterate through y
		for (let x = 0; x < WIDTH; x++) {
			//iterate through x
			// HORIZONTAL - Ex. [[0,1],[0,2],[0,3],[0,4]]
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			// VERTICAL - Ex. [[1,0],[2,0],[3,0],[4,0]]
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			// RIGHT DIAGONAL - Ex. [[0,0],[1,1],[2,2],[3,3]]
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			// LEFT DIAGONAL - Ex. [[0,3],[1,2],[2,1],[3,0]]
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			// if any of the combination array combinations are true return true
			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

// checks if the entire board is filled. returns true or false
const entireBoardFilled = () => board.every((row) => row.every((cell) => cell));

// When the DOM loads
window.addEventListener('DOMContentLoaded', function () {
	makeBoard();
	makeHtmlBoard();
});

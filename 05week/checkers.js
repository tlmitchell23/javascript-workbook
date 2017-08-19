'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// The color argument will help deciding the color of the Checker
// if the color is white make the symbol white. If not make it black
class Checker {
  constructor(color) {
    if (color === 'white') {
      this.symbol = String.fromCharCode(0x125CB);
    }
    else {
      this.symbol = String.fromCharCode(0x125CF);
    }
  }
}

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };

  // Next we will place the checkers into an array to see our moves
  // White checkers will be at the top of the board starting at row 0 and ending at row 2
 // The black checkers will be at the bottom of the board  in rows 5, 6, 7.
 // Place all checker moves into the this.checkers array
   this.checkers = [];
   this.createCheckers = function() {
      const whitePositions =
      [[0, 1], [0, 3], [0, 5], [0, 7],
       [1, 0], [1, 2], [1, 4], [1, 6],
       [2, 1], [2, 3], [2, 5], [2, 7]];

    const blackPositions =
     [[5, 0], [5, 2], [5, 4], [5, 6],
      [6, 1], [6, 3], [6, 5], [6, 7],
      [7, 0], [7, 2], [7, 4], [7, 6]];

      // Use a loop to print out the checkers onto the grid
      // The index of the white positions array and black positions array
      // will go through the loop if it was entered for whichPiece and toWhere
       for (var i = 0; i <= 11; i++) {
        let checker = new Checker('white');
        let pos = whitePositions[i];
        this.checkers.push(checker);
        this.grid[pos[0]][pos[1]] = checker;
        let checkerBlack = new Checker('black');
        pos = blackPositions[i];
        this.checkers.push(checkerBlack);
        this.grid[pos[0]][pos[1]] = checkerBlack;
      }
    }

    // print the checker to the grid
    this.selectChecker = function(row, column) {
      return this.grid[row][column];
    }

    //We need to remove the checker that has been jumped
    //
     this.killChecker = function(position) {
      const checkerPositionKill = this.selectChecker(position[0], position[1]);
      const checkerIndex = this.checkers.indexOf(checkerPositionKill);
      if (checkerPositionKill !== null) {
         this.checkers.splice(checkerIndex, 1);
        this.grid[position[0]][position[1]] = null;
    }
  }
}
function Game() {

  this.board = new Board();

  this.start = function() {
    this.board.createGrid();
      // Your code here
     //placing checkers
     this.board.createCheckers()
    };
    //Next, in your Game class, create a this.moveChecker method that takes two parameters start, end.
   //These two arguments will each contain a row and a column, eg. 50, 41.
   //Inside the method, use your board helper method selectChecker to select the checker at your starting row column coordinates
   //and set it to a local variable checker. Then set that spot on the grid to null and set the spot at the end row column coordinate to the checker.
   //You should be able to move checkers around on the board now!
   //making so players can move the checkers
   this.moveChecker = function(start, end) {
     //moving the checker and nulling the spot where it was
     const checker = this.board.selectChecker(start[0], start[1]);
     this.board.grid[start[0]][start[1]] = null;
     this.board.grid[end[0]][end[1]] = checker;
     //setting variables to find the start and end spot of the move to jump a checker
      const startRow = Number(start[0]);
      const startColumn = Number(start[1]);
      const endRow = Number(end[0]);
      const endColumn = Number(end[1]);
      // finding the spot of the checker that was jumped
      const cord1 = (startRow + endRow) / 2;
      const cord2 = (startColumn + endColumn) / 2;
      const killPosition = [cord1, cord2];
      //setting the absolute value of the start and end to make sure the player moved two spots for a jump.
      // then calling the method to remove the jumped checker
      if (Math.abs(startRow - endEow) ===  2)
        this.board.killChecker(killPosition);
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

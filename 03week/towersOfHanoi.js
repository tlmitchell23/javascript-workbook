'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
//Moving the numbers over to each stack
//We need to remove the last number in the startStack
//And move it to the end of the endStack
function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop());
}
//We must confirm each move is legal
//The start stack must have a number in it to move
//The number in the array needs to be less than the number already in the stack
function isLegal(startStack, endStack) {
  if (stacks[startStack].length === 0) {
    return false;
  }
  else if (stacks[endStack].length === 0) {
    return true;
  }
  else {
    return stacks[startStack][stacks[startStack].length-1] < stacks[endStack][stacks[endStack].length-1];
  }
}
//Check for a win after each move
//In this case when all 4 numbers are in either stack a or b = Win!
//This is for a 4 stack tower only
function checkForWin(startStack, endStack) {
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    return true;
  } else {
    return false;
  }
}
//Aslong as the move is legal you can next move the block.
//If the move is legal and we can move a piece we will next check for a win
//
function towersOfHanoi(startStack, endStack) {
  const validEntry = (myStack) => {
    const entry = ["a","b","c"];
    return entry.some(validEntry => myStack === validEntry);
  }
  if (validEntry(startStack) && validEntry(endStack) && isLegal(startStack, endStack)) {
    movePiece (startStack, endStack);
    if (checkForWin(startStack, endStack)) {
      console.log("Winner!!!!!!!");
    }
  } else {
    console.log("Cannot move to this stack");
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}

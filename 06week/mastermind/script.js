'use strict';

 document.addEventListener('DOMContentLoaded', () => {
   const boardColors = ['red', 'blue', 'green', 'white', 'yellow', 'purple', 'orange', 'black'];
   let turn = 0;
   const guessmax = 10;

   function guess() {
     this.pegs = [];
     this.hint = '';
   }

   let board = {
     masterCode: [],
     guesses: [],
     createCode: function() {
       for (let i = 0; i < 4; i++) {
          const randomIndex = getRandomInt(0, boardColors.length);
          this.masterCode.push(randomIndex);
       }

        function getRandomInt(min, max)  {
         return Math.floor(Math.random() * (max - min)) + min;
        }
     },

     showChoice: function(selectedColor) {
       if (this['guesses'].length) {
         const currentGuess = this['guesses'][this['guesses'].length - 1];
         if (currentGuess.pegs.length === 4) {
         } else {
           currentGuess.pegs.push(selectedColor);
         }
       } else {
         const currentGuess = new guess();
          currentGuess.pegs.push(selectedColor);
          this['guesses'].push(currentGuess);
        }
        this.displayRow();
      },
      // In this table we need a function that will show each peg with the
      // color that was just selected by the player.
      // Once 4 colors have been selected for the pegs we need to
      // generate a hint.
      displayRow: function() {
        const row = this['guesses'].length-1;
        const guessRows = document.getElementById('boardTbl').childNodes;
        const guessCols = guessRows[row].childNodes;
         for (let i = 0; i < 5; i++) {
          if (i === 4) {
            guessCols[i].textContent = this['guesses'][row].hint;
          } else if (this['guesses'][row].pegs[i]) {
            guessCols[i].className = `peg ${boardColors[this['guesses'][row].pegs[i]]}`;
          } else {
            guessCols[i].className = `peg`;
          }
        }
      },
      // generateHint will use exactMatch and correctPeg to help the player solve the code
      // The loop will run through the random answer and the players guess to find matches
      // If the Solution Array contains the exact index of the peg we will add 1 to exact match
      // If it is not an exact match we will compare to see how many
      generateHint: function(answer, guess) {
        let exactMatch = 0;
        let correctColor = 0;
        let matchIndex = -1;
        let solutionArr = answer.split('');
        let myGuessArr = guess.split('');
        myGuessArr.forEach((peg, index) => {
           if (peg === solutionArr[index]) {
            exactMatch++;
            solutionArr[index] = null;
            myGuessArr[index] = null;
          }
        });
        myGuessArr.forEach((peg) => {
          if (peg) {
           matchIndex = solutionArr.indexOf(peg);
            if (matchIndex !== -1) {
              correctColor++
              solutionArr[matchIndex] = null;
            }
          }
        });
          return `${exactMatch} - ${correctColor}`;
      }
    }
    // Next we need to show all of the peg positions that can be filled
    // The board will generate and we can show which color we choice in the correct row
    // As the player selects colors from the row of colors they will be appended
    createPegCanvas();
    addListenersToButtons();
    generateBoard();
   board.createCode();
    function createPegCanvas() {
      const colorsRow = document.getElementById('boardColors');
      for(let i = 0; i < boardColors.length; i++){
        const pegColor = document.createElement('div');
        pegColor.id = i;
        pegColor.className = `${boardColors[i]} box`;
         pegColor.addEventListener('click', (color) => {
          board.showChoice(color.target.id);
        });
        colorsRow.appendChild(pegColor);
      }
    }
    // We need to add a listener to the submit button to check for a win
    // or to see if we need to generate a hint.
    function addListenersToButtons() {
     const submitBtn = document.getElementsByName('submit');
      submitBtn[0].addEventListener('click', () => {
        const currentGuess = board['guesses'][board['guesses'].length-1];
        const solution = board['masterCode'].join('');
        const theGuess = currentGuess.pegs.join('');
        if (solution === theGuess) {
          alert('YOU ARE THE MASTERMIND!!!!!!!');
        } else {
          currentGuess['hint'] = board.generateHint(solution, theGuess);
          board.displayRow();
          board['guesses'].push(new guess());
        }
      });
      // New Game button needs to clear out code, guesses array, and the board
      const newGame = document.getElementsByName('new');
      newGame[0].addEventListener('click', () => {
        board['guesses'] = [];
        board['masterCode'] = [];
        clearBoard();
        const submitBtn = document.getElementsByName('submit');
        submitBtn[0].disabled = false;
        board.createCode();
      });
    }
    // Display the table onto the page
    // This grid table will show the pegs for the colors to be loaded onto
    // It will also show the hint section
    // We will also create classes so we can use CSS to style
    function generateBoard() {
     const boardTable = document.createElement("table");
     boardTable.id = 'boardTbl';
     document.getElementById('board').appendChild(boardTable);
     for(let i = 0; i < guessmax ; i++) {
       const guessRow = document.createElement("tr");
       guessRow.className = 'guessRow';
       boardTable.appendChild(guessRow);
       for (let j = 0; j < 5; j++) {
         const guessCol = document.createElement("td");
         j < 4 ? guessCol.className = `peg` : guessCol.className =  `hint`;
         guessRow.appendChild(guessCol);
       }
     }
    }
  // Clear out every peg and the hint row
  // Use null to fill
  function clearBoard() {
    const guessRows = document.getElementById('boardTbl').childNodes;
    guessRows.forEach((row) => {
      const clearAll = row.childNodes;
      clearAll.forEach((val, index) => {
        index !== 4 ? val.className = `peg` : val.textContent = null;
      });
    });
  }
  });

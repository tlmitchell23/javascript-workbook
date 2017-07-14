 'use strict';

<!-- #1 - Display the Date -->

function ReturnDate() {
const date = new Date;
return date;
}
console.log (ReturnDate());

<!-- #2 convert a number to a string -->

function numToString () {
const num= 11;
const str= num.toString();
return str;
};

console.log (numToString());

<!-- #3 convert a string to a number -->

function stringToNum () {
const x= Number("1000");
return x;
}

console.log (stringToNum());

<!-- #4 different data types -->

function printoutDataType (argument) {
return typeof argument;
}

console.log(printoutDataType(1<9));

<!-- #5 adds 2 numbers together -->

function addNum () {
const x = 50;
const y = 100;
const z = x + y;
return z;
}

console.log (addNum());

<!-- #6 runs only when 2 things are true -->

const b= ((4 > 2) && (10 < 15));
  if (b) {
    console.log ("this is true");
  } else  {
    console.log ("this is false");
 }

<!-- #7 runs when 1 of 2 things are true -->

function checkTrue (){
  if(25 > 2 || 17 < 15) {
    return true;
  } else {
    return false;
  }
}
console.log(checkTrue());

<!-- #8 both are not true -->

function check (x,y){
  if(!x && !y) {
    return true;
  }
}
console.log(check(null,null));

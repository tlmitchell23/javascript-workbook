'use strict';

//#1 - Display the Date

function ReturnDate() {
  return date;
}
console.log (ReturnDate());

//#2 convert a number to a string

function numToString () {
  const x= String('hey hey hey')
  return x;
}

console.log (numToString());

//#3 convert a string to a number

function stringToNum () {
  const x= Number("1000");
  return x;
}

console.log (stringToNum());

//#4 different data types

function printoutDataType (argument) {
  return typeof argument;
}

console.log(printoutDataType(1<9));

//#5 adds 2 numbers together

function addNum (x,y) {
  const z = x + y;
  return z;
}

console.log (addNum());

//#6 runs only when 2 things are true

function check (x,y){
  if(x && y) {
    return true;
  }
}
console.log(check(3,33));

//#7 runs when 1 of 2 things are true

function check (x,y){
  if(x && !y) {
    return true;
  }
}
console.log(check(3,null));

//#8 both are not true

function check (x,y){
  if(!x && !y) {
    return true;
  }
}
console.log(check(null,null));

'use strict';

const assert = require('assert');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];
let swap = false;
for (let i = 0; i < 10; i++) {
  arr.push(getRandomInt(0, 1000));
}

//bubbleSort function will sort the array of integers that is passed in
//it does this by comparing array [n] to the array [n+1]
//the smaller number will be moved to the left and the larger to the right
//at the end of the sort it will show integers from smallest to the largest shown in an array

function bubbleSort(int) {
  for (let i=0; i < int.length; i++) {
    if (int[i] > int[i + 1]) {
      swap = true;
      int[i+1] = int[i+1] - int[i];
      int[i] = int[i] + int[i+1];
      int[i+1] = int[i] - int[i+1];
    }
  }
  if (swap) {
    swap = false;
    return bubbleSort(int);
  } else {
    return int;
  }
}

console.log(arr);
console.log(bubbleSort(arr));

//******************************************************************************
//MERGE SORT
//We will pass an array of random integers into mergeSort function to be sorted
//we will divide the array in half
//We will slice the left side of the array up until the middle number
//the right side will be starting after the middle number
//next sort the left side and the right side
//those number arrays will be merged back together

function mergeSort(int) {
  if (int.length < 2) return int;
  let middle = Math.floor(int.length / 2);
  let leftSide = int.slice(0, middle);
  let rightSide = int.slice(middle);
  return merge(mergeSort(leftSide), mergeSort(rightSide));
}

function merge (left, right) {
  let result = [];
  while (left.length && right.length)
    result.push(left[0] < right[0]? left.shift() : right.shift());
  return result.concat(left.length? left : right);
}

console.log(arr);
console.log(mergeSort(arr));

//******************************************************************************
//BINARY SORT

function binarySearch(int, item, start=0, end = int.length-1) {
  let middle = Math.floor(start + (end-start)/2);
  //console.log(start, end, middle, int[middle]);
  if (item == int[middle]) return middle;
  else if (start>=end) return false;
  else if (item < int[middle]) return binarySearch(int, item, start, middle-1);
  else if (item > int[middle]) return binarySearch(int, item, middle+1, end);
}

console.log(arr);
console.log(binarySearch(arr, 50));

// Tests

if (typeof describe === 'function') {

  function comparator(a, b) {
    if (Number(a) < Number(b)) return -1;
    if (Number(a) > Number(b)) return 1;
    return 0;
  }

  describe('#bubbleSort()', () => {
    it('should sort array', () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#mergeSort()', () => {
    it('should sort array', () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#binarySearch()', () => {
    it('should return the index of given item if sorted array contains it', () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it('should return false if item not in sorted array', () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });

} else {

  console.log('Run the tests!')

}

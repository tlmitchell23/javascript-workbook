//#1
let cars = ["ford", "mazda", "dodge", "chevy"];
console.log(cars.length);
//#2
let moreCars = ["bmw", "benz", "nissan", "honda"];
let totalCars = cars.concat(moreCars);
console.log(totalCars);
//#3
console.log(totalCars.indexOf("honda"));
console.log(totalCars.lastIndexOf("ford"));
//#4
let stringOfCars = totalCars.join(', ');
console.log(stringOfCars);
//#5
stringOfCars.split[", "];
console.log(totalCars);

//#6
let carsInReverse = totalCars.reverse();
carsInReverse;
//#7
carsInReverse.sort();
alert(carsInReverse.indexOf('benz'));

//#8
let removedCars = carsInReverse.slice(1,-1);
console.log(removedCars);

//#9
carsInReverse.splice(1, 2, "ford", "honda");
console.log(carsInReverse);

//#10
carsInReverse.push("benz", "nissan");
console.log(carsInReverse);

//#11
let popped = carsInReverse.pop();
console.log(popped);

//#12
let b = carsInReverse.shift();
console.log(b);

//#13
carsInReverse.unshift("GT");
console.log(carsInReverse);

//#14
function plusTwo() {
  let numbers = [23, 45, 0, 2];
  numbers.forEach((num, index) => {
  numbers[index] = num + 2});
  console.log(numbers);

}
plusTwo();

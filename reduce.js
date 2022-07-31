let arr = [5, 6, 7, 8, 9, 10];
let resultArr = arr.reduce((prev, current) => prev + current, 0);
console.log(resultArr); //45

function reduce(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    // result = result + arr[i];
    result += arr[i];
  }
  return result;
}
console.log(reduce(arr)); //45

let ary = [
  {
    id: 1,
    type: "A",
    price: 100,
  },
  {
    id: 2,
    type: "B",
    price: 200,
  },
  {
    id: 3,
    type: "A",
    price: 150,
  },
];

let resultAry = ary.reduce((prev, current) => prev + current.price, 0);
console.log(resultAry);//450

function reduceAry(ary) {
  let result = 0;
  for (let i = 0; i < ary.length; i++) {
    
    result += ary[i].price;
  }
  return result;
}
console.log(reduceAry(ary));//450

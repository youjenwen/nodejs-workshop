let arr = [5, 10, 78, 45, 1];
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
let result = arr.map((x) => x * 2);
// console.log(result);

function map(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  //   return result;
  console.log(result);
}
map(arr);
// console.log(map(arr)); //[ 10, 20, 156, 90, 2 ]

let resultAry = ary.map((item) => item.price * 2);
// console.log(resultAry); //[ 200, 400, 300 ]

function map2(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    result.push(ary[i].price * 2);
  }
  return result;
}
// console.log(map2(ary)); //[ 200, 400, 300 ]

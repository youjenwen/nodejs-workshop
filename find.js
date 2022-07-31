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

let found = arr.find((ele) => ele > 10);
console.log(found);//78

function find(arr) {
  let result;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 10) {
      return (result = arr[i]);
    }
  }
  //印出最後符合的內容
  //   return result;
}
console.log(find(arr));//78

let found2 = ary.find((item) => item.price > 100);
console.log(found2); //物件

function find2(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].price > 100) {
      result.push(ary[i]);
      return result;
    }
  }
  //印出全部符合結果陣列，find()要的是第一個符合的
  // return result;
}
console.log(find2(ary));

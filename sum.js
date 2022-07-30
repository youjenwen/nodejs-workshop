//sum.js

//方法一
function sum(n) {
    //1+2+3+....n
    // return n;
    let result = 0
    for (let i = 0; i <= n; i++) {
        result = result + i;
    }
    return result;
}

console.log(sum(1));//1
console.log(sum(3));//6
console.log(sum(10));//55

//方法二
function sum2(n) {
    return (n + 1) * n / 2;
}

console.log(sum2(10));
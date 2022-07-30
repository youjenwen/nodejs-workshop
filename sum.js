//sum.js

function sum(n){
    //1+2+3+....n
    // return n;
    let result=0
    for(let i=0;i<=n;i++){
       result=result+i;
    }
    return result;
    
}

console.log(sum(1));//1
console.log(sum(3));//6
console.log(sum(10));//55
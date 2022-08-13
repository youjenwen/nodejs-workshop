const fs = require('fs');

// let promiseFile = new Promise((resolve, rejects) => {
//     fs.readFile('test.txt', 'utf8', (err, data) => {
//         if (err) {
//             rejects(err);
//         }
//         resolve(data);
//     });
// })

// (async () => {
//         try {
//             let result = await promiseFile
//             console.log(result);
//         }
//         catch (err) {
//             console.log(`發生錯誤${err}`);
//         }
//     })();
let p = new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
      if (err) {
        return reject(err); // if(status === pending) promise status -> rejected
      }
      // 如果 reject 沒有加上 return
      // 這行會被印出來 (即使是 reject 時也是)
      resolve(data); // if(status === pending) promise status -> fulfilled
    });
  });


(async () => {
    try {
      let data = await p;
      console.log('await', data);
    } catch (e) {
      console.error(e);
    }
  })();
// async function asyncFile() {
//     try {
//         let result = await promiseFile
//         console.log(result);
//     }
//     catch (err) {
//         console.log(`發生錯誤${err}`);
//     }
// }
// asyncFile();
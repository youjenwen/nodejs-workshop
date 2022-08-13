const fs = require('fs');

let result = function (fileName) {
    return new Promise((resolve, rejects) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                rejects(err);
                //可以在前面加return 下面程式即不會執行
                //(預防之後還有其他程式)
            }
            resolve(data);
        });
    })
}
result('test.txt')
    .then((data) => {
        console.log(data);
    })
    // .catch((err) => {
    //     console.log(`發生錯誤${err}`);
    // })
    .catch(console.log)//另一寫法
const fs = require('fs');

let result = function (fileName) {
    return new Promise((resolve, rejects) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                rejects(err);
            }
            resolve(data);
        });
    })
}
result('test.txt')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(`發生錯誤${err}`);
    })
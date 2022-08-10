const fs = require('fs');

let promiseFile = function (fileName) {
    return new Promise((resolve, rejects) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                rejects(err);
            }
            resolve(data);
        });
    })
}
async function asyncFile(file){
    try{
        let result = await promiseFile(file)
        console.log(result);
    }
    catch(err){
        console.log(`發生錯誤${err}`);
    }
}
asyncFile('test.txt');
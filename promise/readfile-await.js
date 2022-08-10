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
async function asyncFile(){
    try{
        let result = await promiseFile('test.txt')
        console.log(result);
    }
    catch(err){
        console.log(`發生錯誤${err}`);
    }
}
asyncFile();
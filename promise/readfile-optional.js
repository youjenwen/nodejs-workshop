// import { readFile } from 'fs/promises';
const fs = require('fs')
//(1)const fs = require('fs/promsise')
//(2)const fs = require('fs').promiese

const controller = new AbortController();
const { signal } = controller;
let modReadfile = function (file) {
    return new Promise((resolve, rejects) => {

        // console.log(controller)
        // console.log(signal.aborted)
        // controller.abort();
        fs.readFile(file, (err, data) => {
            //如果中止或是檔案錯誤
            if (signal.aborted || err) {
                rejects(err)
                // console.log(`modReadFile err: ${err}`);
            }
            resolve(data)
        });

    })
}
async function test(file) {
    try {
        // Abort the request before the promise settles.
        // controller.abort();//中止
        let result = await modReadfile(file);
        console.log(`result: ${result}`);
    } catch (err) {
        // When a request is aborted - err is an AbortError
        console.error("AbortError!!");
    }
}
test('test.txt')
// import { readFile } from 'fs/promises';
const fs = require('fs');

async function test(file) {
    try {
        const controller = new AbortController();
        const { signal } = controller;
        const promise = fs.readFile(fileName, { signal });

        // Abort the request before the promise settles.
        controller.abort();

        await promise;
    } catch (err) {
        // When a request is aborted - err is an AbortError
        console.error(err);
    }
}
test('test.txt');
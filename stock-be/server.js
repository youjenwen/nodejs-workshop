const express = require('express');

require('dotenv').config();
//利用express建立web application
const app = express();
//從.env讀取
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.end('Hello Express');
});

app.listen(port, () => {
  console.log(`sever star at ${port}`);
});

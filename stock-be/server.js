const express = require('express');
require('dotenv').config();
//利用express建立web application
const app = express();
//從.env讀取
const port = process.env.SERVER_PORT;

const cors = require('cors');
app.use(cors()); //這裡也是中間件

const pool = require('./utils/db');

let stocksRouter = require('./router/stocks');
app.use('/api/1.0/stocks', stocksRouter);

app.use((req, res, next) => {
  console.log('這是第1個');
  next();
});
// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res) => {
  res.send('這裡是首頁');
});

app.use((req, res, next) => {
  console.log('404');
  res.status(404).send('Not Found!');
});

app.listen(port, () => {
  console.log(`sever star at ${port}`);
});

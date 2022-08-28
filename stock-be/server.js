const express = require('express');

require('dotenv').config();
//利用express建立web application
const app = express();
//從.env讀取
const port = process.env.SERVER_PORT;

const cors = require('cors');
app.use(cors()); //這裡也是中間件

const mysql = require('mysql2');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // 限制 pool 連線數的上限
    connectionLimit: 10,
    //請保持 date 是 string，不要轉成 js 的 date物件
    dateStrings: true,
  })
  .promise();

//API
app.get('/api/1.0/stocks', async (req, res, next) => {
  // console.log(process.env.DB_NAME);
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];

  let [data] = await pool.execute('SELECT * FROM stocks');

  // console.log(data);
  res.json(data);
});
//stockDetails API所有股票代碼
app.get('/api/1.0/stocks/:stockId', async (req, res, next) => {
  const { stockId } = req.params;
  // console.log(process.env.DB_NAME);

  //要怎麼得到id? 利用params
  //直接貼sql語法會有問題 -> sql injection 如果在網址裡輸入 || 1=1 -- 全部資料都會顯示
  // let [data] = await pool.execute(
  //   `SELECT * FROM stock_prices WHERE stock_id=${stockId}`
  // );
  //
  let [data] = await pool.execute(
    'SELECT * FROM stock_prices WHERE stock_id=?',
    [stockId]
  );

  console.log(data);
  res.json(data);
});

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

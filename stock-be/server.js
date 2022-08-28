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
  const stockId = req.params.stockId;
  //一頁幾筆
  let perPage = 3;
  //第幾頁 GET /api/1.0/stock/:stockId?page=1
  //預設1
  let page = req.query.page || 1;
  //顯示第1頁要跳過前0筆資料，從第1筆開始
  //0~3 page=1
  //顯示第2頁要跳過前3筆資料，從第4筆開始
  //4~6 page=2......
  //offset 欲跳過筆數
  let offset = perPage * (page - 1);
  //取得總筆數
  let [total] = await pool.execute(
    'SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?',
    [stockId]
  );
  // console.log('total', total[0].total);
  total = total[0].total;
  let lastPage = Math.ceil(total / perPage);
  // console.log('lastpage', lastPage);
  let [data] = await pool.execute(
    'SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?',
    [stockId, perPage, offset]
  );
  // console.log(data);
  res.json({
    pagination: {
      total, //總頁數
      perPage, //一頁幾筆
      page, //目前第幾頁
      lastPage, //總共幾頁
    },
    data,
  });
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

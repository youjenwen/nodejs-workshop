const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

//API
router.get('/', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  // console.log(data);
  res.json(data);
});
//stockDetails API所有股票代碼
router.get('/:stockId', async (req, res, next) => {
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

module.exports = router;
//不要打錯~

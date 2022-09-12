// controllers/stock.js

const stockModel = require('../models/stock');

async function getStockList(req, res, next) {
  console.log('/api/1.0/stocks');
  let data = await stockModel.getAllStocks();
  // console.log('result', data);
  res.json(data);
}

async function getStockDetail(req, res, next) {
  // 依靠 authMiddleware.checkLogin 來判斷是否有登入

  const stockId = req.params.stockId;
  // 分頁
  // 透過 query string 取得目前要第幾頁的資料
  // 如果沒有設定，就預設要第一頁的資料
  let page = req.query.page || 1;
  // 每一頁拿五筆資料
  const perPage = 5;
  // 取得總筆數
  let total = await stockModel.countByStockId(stockId);
  // 計算總頁數 Math.ceil
  let lastPage = Math.ceil(total / perPage);

  // 計算 offset
  const offset = perPage * (page - 1);

  // 根據 perPage 及 offset 去取得資料
  let data = await stockModel.getDataByStockId(stockId, perPage, offset);

  // 把取得的資料回覆給前端
  res.json({
    pagination: {
      total, // 總共有幾筆
      perPage, // 一頁有幾筆
      page, // 目前在第幾頁
      lastPage, // 總頁數
    },
    data,
  });
}

module.exports = { getStockList, getStockDetail };

const pool = require('../utils/db');

// fat controller vs fat model
// controller - service - model

async function getAllStocks() {
  // 寫法1:
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];
  // 寫法2:
  let [data] = await pool.execute('SELECT * FROM stocks');
  return data;
}

async function countByStockId(stockId) {
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);
  // [ { total: 57 } ]
  return total[0].total;
}

async function getDataByStockId(stockId, perPage, offset) {
  // 根據 perPage 及 offset 去取得資料
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);
  return data;
}

async function getStockByStockId(stockId) {
  let [data] = await pool.execute('SELECT * FROM stocks WHERE id = ?', [stockId]);
  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

module.exports = { getAllStocks, countByStockId, getDataByStockId, getStockByStockId };

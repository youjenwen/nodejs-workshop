// models/member

const pool = require('../utils/db');

async function addFavoriteStock(memberId, stockId) {
  let [result] = await pool.execute('INSERT INTO member_stocks (member_id, stock_id) VALUES (?, ?)', [memberId, stockId]);
  console.log('addFavoriteStock', result);
}

async function getFavoriteStock(memberId) {
  let [result] = await pool.execute('SELECT * FROM member_stocks WHERE member_id = ?', [memberId]);
  return result;
}

async function removeFavoriteStock(memberId, stockId) {
  let [result] = await pool.execute('DELETE FROM member_stocks WHERE member_id = ? AND stock_id = ?', [memberId, stockId]);
  console.log('removeFavoriteStock', result);
}

module.exports = { addFavoriteStock, getFavoriteStock, removeFavoriteStock };

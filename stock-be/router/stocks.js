// /stock-be/routers/stock.js
// router: mini app
const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock');
const authMiddleware = require('../middlewares/auth');

// MVC
// Model: 處理跟資料庫有關的東西
// View: pug
// Controller: 處理商業邏輯

// API
// 列出所有股票代碼
// GET /stocks
router.get('/', stockController.getStockList);

// 列出某個股票代碼的所有報價資料
// GET /stocks/2330?page=1
router.get(
  '/:stockId',
  authMiddleware.checkLogin,
  stockController.getStockDetail
);

module.exports = router;

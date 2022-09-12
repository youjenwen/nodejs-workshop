const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

const stockModel = require('../models/stock');
const memberModel = require('../models/member');

// 登入後才可以使用
router.get('/', authMiddleware.checkLogin, (req, res, next) => {
  // 方法 1: 根據 session 中儲存的 member id 去撈資料庫，
  //        把資料庫裡會員的資料回覆給前端
  //        優點: 這樣做資料比較即時跟正確
  //        缺點: 一直去存取資料庫

  // 方法 2: 是可以直接回覆 session 裡的資料
  // Note: 如果有提供修改會員資料功能，更新成功後，要去更新 session
  res.json(req.session.member);
});

// POST /member/stocks/:stockId
router.post(
  '/stocks/:stockId',
  authMiddleware.checkLogin,
  async (req, res, next) => {
    // 確認這個 stock id 是否真的存在
    let stock = await stockModel.getStockByStockId(req.params.stockId);
    if (!stock) {
      return res.json({ message: '查無此商品' });
    }
    // 存在: 加進 member_stocks 的表
    await memberModel.addFavoriteStock(
      req.session.member.id,
      req.params.stockId
    );
    // 再去拿一次資料
    let stocks = await memberModel.getFavoriteStock(req.session.member.id);
    res.json({ message: 'ok', stocks });
  }
);

router.get('/stocks', authMiddleware.checkLogin, async (req, res, next) => {
  let stocks = await memberModel.getFavoriteStock(req.session.member.id);
  res.json(stocks);
});

// DELETE /member/stocks/:stockId 取消收藏
router.delete(
  '/stocks/:stockId',
  authMiddleware.checkLogin,
  async (req, res, next) => {
    // 刪除 member_stocks 的表
    await memberModel.removeFavoriteStock(
      req.session.member.id,
      req.params.stockId
    );
    // 再去拿一次資料
    let stocks = await memberModel.getFavoriteStock(req.session.member.id);
    res.json({ message: 'ok', stocks });
  }
);

module.exports = router;

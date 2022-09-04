const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); //引入資料庫
const bcrypt = require('bcrypt');

router.post('/api/1.0/auth/register', async (req, res, next) => {
  console.log('register', req.body);
  let [member] = await pool.execute('SELECT * FROM members WHERE email = ?', [
    req.body.email,
  ]);
  //  檢查 email 有沒有重複
  //  如果有，回覆 400 跟錯誤訊息
  if (member.length == 0) {
    // 密碼要雜湊 hash
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    // 資料存到資料庫
    let result = await pool.execute(
      'INSERT INTO members (email,password,name) VALUE (?, ?, ?)',
      [req.body.email, hashPassword, req.body.name]
    );
    console.log('Insert into result', result);
    // 回覆前端
    res.json({ message: 'OK' });
  } else {
    return res.status(404).json({ message: '已存在使用者' });
  }
});

module.exports = router;

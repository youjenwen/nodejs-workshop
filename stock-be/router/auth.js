const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); //引入資料庫
//安裝 引用bcrypt
const bcrypt = require('bcrypt');

//安裝 引用express-validator
const { body, validationResult } = require('express-validator');

const registerRules = [
  //中間件：檢查email
  body('email').isEmail().withMessage('Email欄位請填寫正確格式'),
  //中間件：檢查password
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  //中間件： 檢查password & confirmPassword 是否一致(客製)
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('密碼驗證不一致'),
];

//TODO:圖片上傳還沒做

router.post('/api/1.0/auth/register', registerRules, async (req, res, next) => {
  console.log('register', req.body);
  //驗證前端資料
  const validateResult = validationResult(req);
  console.log('validateResult ', validateResult);

  if (!validateResult.isEmpty()) {
    //validateResult 不為空 則有錯誤需回傳給前端
    return res.status(400).json({ errors: validateResult.array() });
  }

  let [member] = await pool.execute('SELECT * FROM members WHERE email = ?', [
    req.body.email,
  ]);
  //  檢查 email 有沒有重複
  //  如果有，回覆 400 跟錯誤訊息
  //判斷2.0
  if (member.length > 0) {
    return res.status(404).json({ message: '已存在使用者' });
  }
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
});

router.post('api/1.0/auth/login', async (req, res, next) => {
  console.log('login', req.body);
  //TODO:資料驗證
  //確認email有無註冊過
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [
    req.body.email,
  ]);

  if (members.length === 0) {
    return res.status(404).json({ message: '帳號或密碼錯誤' });
  }
  let member = members[0];
  //有註冊過就比密碼
  //使用bcrypt.compare()
  let compareResult = await bcrypt.compare(req.body.password, member.password);
  if (!compareResult) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
  // TODO: 密碼比對成功 -> (1) jwt token (2) session/cookie
  // TODO: 回覆前端登入成功
  res.json({});
});

module.exports = router;

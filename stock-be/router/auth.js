const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); //引入資料庫
//安裝 引用bcrypt
const bcrypt = require('bcrypt');

//安裝 引用express-validator
const { body, validationResult } = require('express-validator');

const registerRules = [
  // 中間件: 檢查 email 是否合法
  body('email').isEmail().withMessage('Email 欄位請填寫正確格式'),
  // 中間件: 檢查密碼長度
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8'),
  // 中間件: 檢查 password & confirmPassword 是否一致
  // 客製自己想要的條件
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('密碼驗證不一致'),
];

//TODO:圖片上傳還沒做(暫時拿老師的)
// nodejs 內建的物件
const path = require('path');
// 如果是用 FormData 上傳圖片，Content-Type 會是：
// Content-Type: multipart/form-data;
// 就要用 multer 相關的套件來處理
// npm i multer
const multer = require('multer');
// 圖面要存在哪裡？
const storage = multer.diskStorage({
  // 設定儲存的目的地（檔案夾）
  // 要先手動建立好檔案夾 /public/uploads
  destination: function (req, file, cb) {
    // path.join 避免不同作業系統之間的 / 或 \
    // __dirname 目前檔案的位置，用 __dirname 就可以不用管是在哪裡執行程式的
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  // 圖片名稱
  filename: function (req, file, cb) {
    console.log('file', file);
    // {
    //   fieldname: 'photo',
    //   originalname: 'japan04-200.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg'
    // }
    // 原始檔名: file.originalname => test.abc.png
    const ext = file.originalname.split('.').pop();
    // or uuid
    // https://www.npmjs.com/package/uuid
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

const uploader = multer({
  storage: storage,
  // 過濾圖片的種類
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/png'
    ) {
      cb(new Error('上傳的檔案型態不接受'), false);
    } else {
      cb(null, true);
    }
  },
  // 過濾檔案的大小
  limits: {
    // 1k = 1024 => 200k = 200 * 1024
    fileSize: 200 * 1024,
  },
});

router.post(
  '/api/1.0/auth/register',
  uploader.single('photo'),
  registerRules,
  async (req, res, next) => {
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
      return res.status(404).json({ message: '這個email已經註冊過' });
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
  }
);

///////login
router.post('/api/1.0/auth/login', async (req, res, next) => {
  console.log('login', req.body);
  //TODO:資料驗證
  //確認email有無註冊過
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [
    req.body.email,
  ]);

  if (members.length === 0) {
    //這個email沒有註冊過 所以長度為0 回覆401
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
  let member = members[0];
  //有註冊過就比密碼
  //使用bcrypt.compare()
  let compareResult = await bcrypt.compare(req.body.password, member.password);
  if (!compareResult) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
  // 密碼比對成功 -> (1) jwt token (2) session/cookie

  // 密碼比對成功 -> 存在 session
  let saveMember = {
    id: member.id,
    name: member.name,
    email: member.email,
    photo: member.photo,
  };
  // 把資料寫進 session 裡
  req.session.member = saveMember;

  //  回覆前端登入成功
  res.json({});
});

module.exports = router;

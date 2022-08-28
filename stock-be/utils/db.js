require('dotenv').config();

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

module.exports = pool;

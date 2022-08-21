const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const mysql = require('mysql2');

require('dotenv').config();

(async () => {
  // console.log('dotenv', process.env.DB_NAME);
  let connection;
  try {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    // connection = mysql.createConnection({
    //   host: 'localhost',
    //   port: 8889,
    //   user: '',
    //   password: '',
    //   database: 'stock_mfee27',
    // });
    //從stockNo.txt讀取代碼
    let stockNo = await fs.readFile('stockNo.txt', 'utf8');
    // console.log(stockNo);
    let queryNameResponse = await axios.get(
      'https://www.twse.com.tw/zh/api/codeQuery',
      {
        params: {
          query: stockNo,
        },
      }
    );
    // console.log(queryNameResponse.data);
    let suggestions = queryNameResponse.data.suggestions;
    // console.log(suggestions);
    let suggestion = suggestions[0];
    if (suggestion === '(無符合之代碼或名稱)') {
      // console.error(suggestion);
      throw new Error(suggestion); //丟錯誤
    }
    let stockName = suggestion.split('\t').pop();
    // console.log(stockName);

    let saveNameResult = connection.execute(
      `INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`,
      [stockNo, stockName]
    );
    // console.log(saveNameResult);
    let queryDate = moment().format('YYYYMMDD');
    let response = await axios.get(
      `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
      {
        params: {
          response: 'json',
          date: queryDate,
          stockNo: stockNo,
        },
      }
    );
    // console.log(response.data);
    let data = response.data.data.map((d) => {
      d = d.map((value) => {
        return value.replace(/,/g, '');
      });
      // console.log(d[0]);
      let splitD = d[0].split('/');
      splitD[0] = parseInt(splitD[0]) + 1911;
      d[0] = splitD.join('');
      // console.log(d);
      d.unshift(stockNo);
      return d;
    });
    // console.log(data);
    //要按照data裡每個陣列裡的順序寫入資料庫
    let savePriceResult = await connection
      .promise()
      .query(
        'INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
        [data]
      );
    console.log(savePriceResult);
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      // 關掉連線
      connection.end();
    }
  }
})();

const axios = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const mysql = require('mysql2');


(async () => {
    let connection;
    try {
        connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: '',
            password: '',
            database: 'stock_mfee27',
        });
        // let data = await fs.readFile('stockNo.txt', 'utf8');
        // console.log(data);
        // let stockFile = fs.readFile('stockNo.txt', 'utf8')
        // let toDay = moment().format('YYYY/MM/DD');
        let stockNo = await fs.readFile('stockNo.txt', 'utf8');
        // console.log(stockNo);
        let response = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
            params: {
                query: stockNo
            }
        });
        console.log(response.data);
        let suggestions = response.data.suggestions;
        // console.log(suggestions);
        let suggestion = suggestions[0]
        if (suggestion === "(無符合之代碼或名稱)") {
            // console.error(suggestion);
            throw new Error(suggestion);//丟錯誤
        }
        let stockName = suggestion.split('\t').pop();
        console.log(stockName);

        let saveNameResult = connection.execute(`INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)`, [stockNo, stockName]);
        console.log(saveNameResult);

    } catch (e) {
        console.error(e);
    } finally {
        if (connection) {
            // 關掉連線
            connection.end();
        }
    }
})();
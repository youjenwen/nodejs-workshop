const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

let stockFile = new Promise((resolve, rejects) => {
    fs.readFile('stockNo.txt', 'utf8', (err, data) => {
        if (err) {
            rejects(err);
        }
        resolve(data);
    });
});

stockFile
    .then((data) => {
        // console.log(data)
        // return data;
        let toDay = moment().format('YYYYMMDD');
        let stockNo = data;
        (async () => {
            try {
                let response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?', {
                    params: {
                        response: 'json',
                        date: toDay,
                        stockNo: stockNo,
                    }
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        })();

    }).catch((e) => {
        console.log(`錯誤: ${e}`);
    })
// console.log(moment().format('YYYYMMDD'))




// axios
//     .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378514253')
//     .then((response) => {
//         console.log(response);
//         // responseDom.innerHTML = `axios response: ${response.data}`;
//     })
//     .catch((error) => {
//         console.error(error);
//     });
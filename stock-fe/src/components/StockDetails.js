import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const StockDetails = () => {
  const { stockId } = useParams(); //不能是陣列接
  // console.log(stockId);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(
        `http://localhost:3001/api/1.0/stocks/${stockId}`
      );
      setData(response.data);
      // console.log('useEffect[] after set', response.data);
    };
    getStock();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {data.map((stockDetails) => {
        //2022-07-31T16:00:00.000Z
        //console.log(stockDetails.date);
        //日期需要轉換  ISO-8601
        const date = moment(new Date(stockDetails.date)).format('YYYY-MM-DD');
        //console.log('date', date);

        return (
          <div
            key={Math.random().toString(36).replace('0.', '')}
            className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              日期：{date}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交金額：{stockDetails.amount}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交股數：{stockDetails.volume}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              開盤價：{stockDetails.open_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              收盤價：{stockDetails.close_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              漲跌價差：{stockDetails.delta_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最高價：{stockDetails.high_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最低價：{stockDetails.low_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交筆數：{stockDetails.transactions}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;

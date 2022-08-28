import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//import moment from 'moment';

const StockDetails = () => {
  const { stockId } = useParams(); //不能是陣列接
  // console.log(stockId);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(
        `http://localhost:3001/api/1.0/stocks/${stockId}?page=${page}`
      );
      setData(response.data.data);
      // console.log('useEffect[] after set', response.data);
      setLastPage(response.data.pagination.lastPage);
      // console.log('response.data.pagination.lastPage',response.data.pagination.lastPage)
    };
    getStock();
  }, [page]);

  let getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      // console.log(i)
      pages.push(
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? '#00d1b2' : '',
            borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>{getPages()}</ul>
      {data.map((stockDetails) => {
        return (
          <div
            key={Math.random().toString(36).replace('0.', '')}
            className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              日期：{stockDetails.date}
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

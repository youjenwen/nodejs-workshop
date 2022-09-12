import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function InsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getStock = async () => {
      let response = await axios.get(`http://localhost:3002/api/1.0/product`);
      //   console.log(response.data);
      setData(response.data);
    };
    getStock();
  });

  return (
    <>
      <h1>InsList</h1>
      <table>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>產品編號</th>
            <th>產品圖片</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => {
            return (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.product_id}</td>
                <td>{v.image}
                <img style={{ width: '150px' }} src="" alt=""/>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default InsList;

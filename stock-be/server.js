const express = require('express');
require('dotenv').config();
//利用express建立web application
const app = express();

const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//從.env讀取
const port = process.env.SERVER_PORT;

//啟用session
const expressSession = require('express-session');
//把 session 存在硬碟中 (業界使用 redis)
var FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      //session 儲存路徑
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    // 如果 session 沒有改變的話，要不要重新儲存一次？
    resave: false,
    // 還沒初始化的，要不要存
    saveUninitialized: false,
  })
);

const cors = require('cors');
// 使用這個第三方提供的 cors 中間件
// 來允許跨源存取
// 預設都是全部開放
app.use(cors());
// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
// const corsOptions = {
//   origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOptions));

const pool = require('./utils/db');

app.use(express.json());

let stocksRouter = require('./router/stocks');
app.use('/api/1.0/stocks', stocksRouter);

let authRouter = require('./router/auth');
app.use(authRouter);

app.use((req, res, next) => {
  console.log('這是第1個');
  next();
});

app.get('/', (req, res) => {
  res.send('這裡是首頁');
});

app.use((req, res, next) => {
  console.log('404');
  res.status(404).send('Not Found!');
});

app.listen(port, () => {
  console.log(`sever star at ${port}`);
});

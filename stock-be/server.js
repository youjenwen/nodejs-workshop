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
// app.use(cors());
// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
const corsOptions = {
  // 如果要讓 cookie 可以跨網域存取，這邊要設定 credentials
  // 且 origin 也要設定
  credentials: true,
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));

//啟用session
const expressSession = require('express-session');
//把session 存在硬碟中
var FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      // session 儲存的路徑
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    // 如果 session 沒有改變的話，要不要重新儲存一次？
    resave: false,
    // 還沒初始化的，要不要存
    saveUninitialized: false,
  })
);

const pool = require('./utils/db');

// 如果要讓 express 認得 json
// Content-Type: application/json
// 就要加上這個中間件
app.use(express.json());

// 設置靜態檔案
// express.static => 讓靜態檔案可以有網址
// http://localhost:3002/uploads/檔案名稱
app.use(express.static(path.join(__dirname, 'public')));
// 或是給 prefix
// http://localhost:3002/public/uploads/檔案名稱
// app.use('/public', express.static(path.join(__dirname, 'public')));

let stocksRouter = require('./router/stocks');
app.use('/api/1.0/stocks', stocksRouter);

let authRouter = require('./router/auth');
app.use(authRouter);

let memberRouter = require('./router/member');
app.use('/api/1.0/member', memberRouter);

// 故意測試發生錯誤的情況
app.use((req, res, next) => {
  console.log('這裡是錯誤頁之前的 middleware');
  // next 如果是要去下一個中間件，就不要放任何參數
  next();
  // next 如果是想要直接跳去錯誤處理中間件 -> 加上任何參數
  // next(123);
});
app.get('/err', (req, res, next) => {
  // throw new Error('故意丟出來的錯誤');
  res.json({ message: '錯誤頁' });
});

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

// 錯誤處理中間件: 放在所有中間件的後面
// 超級特殊的 middleware
// 會有四個參數
// 他會捕捉上面所有中間件的 exception
// 有點像是所有的中間件的 catch
app.use((err, req, res, next) => {
  console.error('來自四個參數的錯誤處理中間件', err);
  console.error('path:', req.path);
  res.status(500).json({ message: '請洽系統管理員' });
});

app.listen(port, () => {
  console.log(`sever star at ${port}`);
});

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stock from './components/Stock';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import StockDetails from './components/StockDetails';
import NotFound from './components/NotFound';
import ChatRoom from './components/ChatRoom';

// import InsList from "./InsList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Stock />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/stock/:stockId" element={<StockDetails />}>
          <Route path=":currentPage" element={<StockDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // <InsList />
  );
}

export default App;

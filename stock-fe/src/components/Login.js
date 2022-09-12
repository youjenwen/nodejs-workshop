import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
  //利用member setMember 從 auth context 拿出來
  const { member, setMember } = useAuth();

  const [loginMember, setLoginMember] = useState({
    email: 'test@gmail.com',
    password: '12345678',
  });

  const [isLogin, setIsLogin] = useState(false);

  function handleChange(e) {
    setLoginMember({ ...loginMember, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post(`${API_URL}/auth/login`, loginMember, {
      //為了可以跨源存取
      withCredentials: true,
    });
    console.log(response.data);
    //告訴auth context 會員有資料
    setMember(response.data);
    setIsLogin(true);
  }

  //登入跳轉
  if (isLogin) {
    return <Navigate to="/about" />;
  }

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
        登入帳戶
      </h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          value={loginMember.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={loginMember.password}
          onChange={handleChange}
        />
      </div>
      <button
        className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
        onClick={handleSubmit}
      >
        登入
      </button>
    </form>
  );
};

export default Login;

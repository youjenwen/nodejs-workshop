import axios from 'axios';
import { API_URL, IMAGE_URL } from '../utils/config';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';

const About = () => {
  // 把 member, setMember 從 auth context 裡頭拿出來
  const { member, setMember } = useAuth();

  if (!member) {
    return <Navigate to="/login" />;
  }

  // 如果從 context 裡面拿，這裡就不用自己再去要一次
  // const [member, setMember] = useState(null);
  // useEffect(() => {
  //   let getMember = async () => {
  //     let response = await axios.get(`${API_URL}/member`, {
  //       withCredentials: true,
  //     });
  //     setMember(response.data);
  //   };
  //   getMember();
  // }, []);

  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      {member ? (
        <>
          <h3>Hi, {member.name}</h3>
          <img src={IMAGE_URL + member.photo} />
        </>
      ) : (
        <h3>請先登入</h3>
      )}
    </div>
  );
};

export default About;

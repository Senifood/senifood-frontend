import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../Img/Back.png";
import Footer from './Footer';
import './HealthCheck.css';

function HealthCheck() {
  const [healthInfo, setHealthInfo] = useState({ answer1: [], answer2: [], answer3: [] });
  const navigate = useNavigate();

  const fetchHealthInfo = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`/api/survey/responses/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setHealthInfo(data);
      } else {
        console.error('Error fetching health info:', data);
        alert("보여드릴 건강정보가 없습니다.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  return (
    <>
      <div className="HealthCheckDiv">
        <div className="HealthCheckHeader">
          <img src={Back} alt="뒤로가기" onClick={() => navigate(-1)} />
          <h2>건강 정보</h2>
        </div>
        <div className="HealthCheckContent">
          <h3>건강 상태</h3>
          <p>{healthInfo.answer1.length > 0 ? healthInfo.answer1.join(', ') : '없음'}</p>
          <h3>알레르기</h3>
          <p>{healthInfo.answer2.length > 0 ? healthInfo.answer2.join(', ') : '없음'}</p>
          <h3>복용 약물</h3>
          <p>{healthInfo.answer3.length > 0 ? healthInfo.answer3.join(', ') : '없음'}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HealthCheck;

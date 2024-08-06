import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Next from "../../Img/Next.png";
import Footer from './Footer';
import './MyPage.css';

function MyPage() {
  const [userName, setUserName] = useState('시니푸드 님');
  const navigate = useNavigate();
  
  const fetchUserName = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`https://senifood-backend-rocif.run.goorm.site/api/user/${userId}`);
        
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        setUserName(data.object.name);
      } else {
        console.error('Error fetching user name:', data);
        setUserName("이름없음");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      setUserName("테스트");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://senifood-backend-rocif.run.goorm.site/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        alert("로그아웃 되었습니다.");
        navigate("/");
      } else {
        console.error('Error logging out:', data);
        alert("로그아웃에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <div className="MyPageDiv">
        <h2 className="MyPageTitle">내 정보</h2>
        <div className="UserProfile">
          <div className="UserAvatar"></div>
          <h3 className="UserName">{userName} 님</h3>
        </div>
        <div className="UserInfo">
          <div className="UserOption" onClick={() => navigate("/healthcheck")}>
            <span className="UOT">건강 정보</span>
            <img src={Next} alt="다음" className="UOI"></img>
          </div>
          <div className="UserOption" onClick={() => navigate("/lunchcheck")}>
            <span className="UOT">도시락 구독 내역</span>
            <img src={Next} alt="다음" className="UOI"></img>
          </div>
        </div>
        <div className="FooterInfo">
          <span>Ver 3.98.2</span>
          <span>최신 버전</span>
          <a href="/mypage" onClick={handleLogout}>로그아웃</a> 
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;

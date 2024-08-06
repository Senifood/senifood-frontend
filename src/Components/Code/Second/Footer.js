import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Recommend2 from "../../Img/Recommend2.png";
import Lunch2 from "../../Img/Lunch2.png";
import Like2 from "../../Img/Like2.png";
import MyPage2 from "../../Img/MyPage2.png";
import Recommend1 from "../../Img/Recommend1.png";
import Lunch1 from "../../Img/Lunch1.png";
import Like1 from "../../Img/Like1.png";
import MyPage1 from "../../Img/MyPage1.png";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMyPageActive = () => {
    const currentPath = location.pathname;
    return currentPath === "/mypage" || currentPath === "/healthcheck" || currentPath === "/lunchcheck";
  };

  const isLunchPageActive = () => {
    const currentPath = location.pathname;
    return currentPath.startsWith("/lunchbox/") || currentPath === "/lunch";
  };

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate('/recommend')}>
        <img src={location.pathname === '/recommend' ? Recommend1 : Recommend2} alt="추천" />
      </button>
      <button onClick={() => navigate('/lunch')}>
        <img src={isLunchPageActive() ? Lunch1 : Lunch2} alt="점심" />
      </button>
      <button onClick={() => navigate('/like')}>
        <img src={location.pathname === '/like' ? Like1 : Like2} alt="좋아요" />
      </button>
      <button onClick={() => navigate('/mypage')}>
        <img src={isMyPageActive() ? MyPage1 : MyPage2} alt="마이페이지" />
      </button>
    </div>
  );
}

export default Footer;

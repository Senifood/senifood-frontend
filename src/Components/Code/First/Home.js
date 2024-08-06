import React from "react";
import { useNavigate } from "react-router-dom";
import main from "../../Img/SeniFood.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="HomeDiv">
      <img src={main} alt="home"></img>
      <h1 className="HomeTitle green">시니푸드</h1>
      <button className="HomeStart" onClick={handleStartClick}>
        시작하기
      </button>
    </div>
  );
}

export default Home;

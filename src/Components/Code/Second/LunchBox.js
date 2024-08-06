import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Back from "../../Img/Back.png";
import "./LunchBox.css";

function LunchBox() {
  const { lunchbox_id } = useParams(); // URL에서 lunchbox_id 파라미터를 가져옴
  const [lunchbox, setLunchbox] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // 팝업 창 상태
  const [isSubscribed, setIsSubscribed] = useState(false); // 구독 상태
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 userId 가져오기

  const fetchLunchbox = async () => {
    console.log(`Fetching lunchbox with ID: ${lunchbox_id}`);
    try {
      const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/lunchbox/${lunchbox_id}`);
      if (!response.ok) {
        throw new Error(`Error fetching lunchbox: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setLunchbox(data);
      setIsSubscribed(data.is_subscribed); // 구독 상태 설정
    } catch (error) {
      console.error("Error fetching lunchbox:", error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubscribeClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubscribe = async () => {
    try {
      const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/lunchbox/subscribe/${userId}/${lunchbox_id}`, {
        method: "POST",
      });
      if (response.ok) {
        setIsSubscribed(true);
        alert("구독을 완료하였습니다!");
      } else {
        alert("구독 요청에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error subscribing to lunchbox:", error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelSubscribe = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    fetchLunchbox();
  }, [fetchLunchbox]);

  if (!lunchbox) {
    return <div>Loading...</div>;
  } 

  return (
    <>
      <div className="LunchBoxDiv">
        <img src={Back} className="back" alt="이전" onClick={() => navigate(-1)}></img>
        <div className="LunchBoxTitle">
          <img src={lunchbox.lunchbox_imageURL} alt={lunchbox.lunchbox_title} className="LunchBoxImage" />
          <h2>{lunchbox.lunchbox_title}</h2>
          <p>{lunchbox.lunchbox_price}원</p>
        </div>
        <div className="LunchBoxDetails">
          <p>도시락 구성:</p> <br/>
          <ul>
            {lunchbox.lunchbox_foods.split(",").map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        <button className="SubscribeButton" onClick={handleSubscribeClick} disabled={isSubscribed}>
          {isSubscribed ? "구독을 완료하였습니다!" : "구독 요청하기"}
        </button>
        {showConfirmation && (
          <div id="note-form" style={{ display: 'block' }}>
            <p>정말 구독하시겠습니까?</p>
            <button className="yes" onClick={handleConfirmSubscribe}>예</button>
            <button className="no" onClick={handleCancelSubscribe}>아니요</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default LunchBox;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Lunch.css";

function Lunch() {
  const [userName, setUserName] = useState("");
  const [lunchboxes, setLunchboxes] = useState([]);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/user/${userId}`);
      
      const data = await response.json();
      if (response.ok) {
        setUserName(data.object.name);
      } else {
        console.error('Error fetching user name:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      setUserName("테스트");
    }
  };

  const fetchLunchboxes = async () => {
    try {
      const response = await fetch('http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/lunchbox');
      
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setLunchboxes(data);
      } else {
        console.error('Error fetching lunchboxes:', data);
        alert("보여드릴 도시락이 없습니다.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchLunchboxes();
  }, []);

  return (
    <>
      <div className="LunchDiv">
        <div className="LunchTitle">
          <h3>{userName} 님을 위한</h3>
          <h3><span className="green">도시락</span> 구독하기</h3>
        </div>
        <div className="LunchContainer">
          {lunchboxes.map((lunchbox, index) => (
            <div className="LunchBox" key={index} onClick={() => navigate(`/lunchbox/${lunchbox.lunchbox_id}`)}>
              <img src={lunchbox.lunchbox_imageURL} alt={lunchbox.lunchbox_title} className="LunchBoxImage"/>
              <p>{lunchbox.lunchbox_title}</p>
              <p>{lunchbox.lunchbox_price}원</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Lunch;

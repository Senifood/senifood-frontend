import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Lunch.css";

// Import all images
import lunchbox1 from '../../Img/lunchbox1.jpeg';
import lunchbox2 from '../../Img/lunchbox2.jpeg';
import lunchbox3 from '../../Img/lunchbox3.jpeg';
import lunchbox4 from '../../Img/lunchbox4.jpeg';
import lunchbox5 from '../../Img/lunchbox5.jpeg';
import lunchbox6 from '../../Img/lunchbox6.jpeg';
import lunchbox7 from '../../Img/lunchbox7.jpeg';

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

  const getImageById = (id) => {
    switch (id) {
      case 1:
        return lunchbox1;
      case 2:
        return lunchbox2;
      case 3:
        return lunchbox3;
      case 4:
        return lunchbox4;
      case 5:
        return lunchbox5;
      case 6:
        return lunchbox6;
      case 7:
        return lunchbox7;
      default:
        return '';
    }
  };

  const fetchLunchboxes = async () => {
    try {
      const response = await fetch('http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/lunchbox');
      
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        // 이미지 URL을 설정
        const updatedLunchboxes = data.map(lunchbox => ({
          ...lunchbox,
          lunchbox_imageURL: getImageById(lunchbox.lunchbox_id)
        }));
        setLunchboxes(updatedLunchboxes);
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

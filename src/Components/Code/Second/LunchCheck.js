import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LunchCheck.css';
import Footer from "./Footer";
import Back from '../../Img/Back.png';
import Next from '../../Img/Next.png';

const LunchCheck = () => {
  const [lunchboxes, setLunchboxes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false); // 팝업 창 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLunchboxes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`https://jocular-elf-62138c.netlify.app/api/lunchbox/subscribe/${userId}`);
        const data = await response.json();
        console.log(data);
        setLunchboxes(data);
      } catch (error) {
        console.error('Error fetching lunchboxes:', error);
        alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    fetchLunchboxes();
  }, []);

  const handleNextClick = () => {
    if (currentIndex < lunchboxes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCancelSubscription = () => {
    setShowConfirmation(true);
  };

  const confirmCancel = async () => {
    const userId = localStorage.getItem('userId');
    const currentLunchboxId = lunchboxes[currentIndex].lunchboxId;
    try {
      const response = await fetch(`https://jocular-elf-62138c.netlify.app/api/lunchbox/subscribe/${userId}/${currentLunchboxId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedLunchboxes = lunchboxes.filter((_, index) => index !== currentIndex);
        setLunchboxes(updatedLunchboxes);

        if (updatedLunchboxes.length === 0) {
            setCurrentIndex(0);
            alert("구독 취소를 완료하였습니다!");
          } else if (currentIndex >= updatedLunchboxes.length) {
            setCurrentIndex(updatedLunchboxes.length - 1);
            alert("구독 취소를 완료하였습니다!");
          } else {
            setCurrentIndex(currentIndex);
            alert("구독 취소를 완료하였습니다!");
          }
      } else {
        console.error('Error unsubscribing from lunchbox:', await response.text());
        alert('구독 취소에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelCancel = () => {
    setShowConfirmation(false);
  };

  if (lunchboxes.length === 0) {
    return (
      <div className="HealthCheckDiv">
        <div className="HealthCheckHeader">
          <img src={Back} alt="뒤로가기" onClick={() => navigate(-1)} />
          <h2 className='title'>도시락 구독 내역</h2>
        </div>
        <div className="LikeMeal">
          <h1>구독한 도시락이 없습니다.</h1>
        </div>
        <Footer />
    </div>
    );
  }

  const currentLunchbox = lunchboxes[currentIndex];

  return (
    <>
    <div className="LunchCheck">
      <header className='LunchCheckHeader'>
        <img src={Back} alt="Back" onClick={() => navigate(-1)} />
        <h2>도시락 구독 내역</h2>
      </header>
      <div className="LunchCheckDetails">
        <div className="NavigationButtons">
          <img src={Back} alt="Previous" onClick={handleBackClick} />
          <img src={currentLunchbox.lunchboxImageURL} alt={currentLunchbox.lunchboxTitle} className='main-img'/>
          <img src={Next} alt="Next" onClick={handleNextClick} />
        </div>
        <h3>{currentLunchbox.lunchboxTitle}</h3>
        <p>{currentLunchbox.lunchboxPrice}원</p> <br/>
        <ul>
          {currentLunchbox.lunchbox_foods 
            ? currentLunchbox.lunchbox_foods.split(',').map((food, index) => (
                <li key={index}>{food}</li>
              ))
            : <li>음식 정보가 없습니다</li>}
        </ul>
      </div>
      <button className="CancelButton" onClick={handleCancelSubscription}>구독 취소</button>
      {showConfirmation && (
        <div id="note-form" style={{ display: 'block' }}>
          <p>정말 구독을 취소하시겠습니까?</p>
          <button onClick={confirmCancel} className='yes'>예</button>
          <button onClick={cancelCancel} className='no'>아니요</button>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default LunchCheck;

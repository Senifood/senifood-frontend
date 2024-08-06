import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Re from "../../Img/Re.png";
import LikeButton1 from "../../Img/LikeButton1.png";
import Next from "../../Img/Next.png";
import Back from "../../Img/Back.png";
import "./Like.css";

function Like() {
  const [userName, setUserName] = useState("");
  const [diets, setDiets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeImage, setLikeImage] = useState(LikeButton1);

  const fetchUserName = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`);
      const data = await response.json();

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

  const fetchLikedDiets = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/diet/likes/${userId}`);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setDiets(data);
        if (data.length > 0) {
          setLikeImage(LikeButton1);
        }
      } else {
        console.error('Error fetching liked diets:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleLikeClick = async () => {
    const userId = localStorage.getItem('userId');
    const currentDietId = diets[currentIndex]?.dietId;
  
    if (likeImage === LikeButton1) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/diet/likes/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ diet_id: currentDietId }),
        });
  
        if (response.ok) {
          const updatedDiets = diets.filter((diet, index) => index !== currentIndex);
          setDiets(updatedDiets);
  
          if (updatedDiets.length === 0) {
            setCurrentIndex(0);
            alert("좋아요를 취소했습니다.");
          } else if (currentIndex >= updatedDiets.length) {
            setCurrentIndex(updatedDiets.length - 1);
            alert("좋아요를 취소했습니다.");
          } else {
            setCurrentIndex(currentIndex);
            alert("좋아요를 취소했습니다.");
          }
        } else {
          console.error('Error unliking diet:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
        alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };
  

  const handleNextClick = () => {
    if (currentIndex < diets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchLikedDiets();
  }, []);

  if (diets.length === 0) {
    return (
      <div className="LikeDiv">
        <div className="LikeTitle">
          <h3>{userName} 님이</h3>
          <h3>좋아한 <span className="green">식단</span></h3>
        </div>
        <div className="LikeMeal">
          <h1>좋아요한 식단이 없습니다.</h1>
        </div>
        <Footer />
    </div>
    );
  }

  const currentDiet = diets[currentIndex] || {};

  return (
    <>
      <div className="LikeDiv">
        <div className="LikeTitle">
          <h3>{userName} 님이</h3>
          <h3>좋아한 <span className="green">식단</span></h3>
        </div>
        <div className="LikeMeal">
          <div className="meal-image">
            <img src={Back} alt="이전" onClick={handleBackClick}></img>
            <img src={currentDiet.dietImageURL} alt={currentDiet.dietTitle} className="real"></img>
            <img src={Next} alt="다음" onClick={handleNextClick}></img>
          </div>
          <div className="LikeBar">
            <img src={Re} alt="새로고침" className="op0"></img>
            <p className="meal-name">{currentDiet.dietTitle}</p>
            <img src={likeImage} alt="좋아요" onClick={handleLikeClick}></img>
         </div>
          <div className="LikeDes">
            <h3 className="meal-function">효능</h3>
            <p className="meal-function">{currentDiet.dietBenefit}</p><br/>
            <h3 className="meal-function">영양소</h3>
            <p className="meal-function">{currentDiet.dietNutrition}</p><br/>
            {currentDiet.dietRecipeURL && (
              <>
                <h3 className="meal-recipe">레시피 보러가기</h3>
                <p className="meal-recipe"><a href={currentDiet.dietRecipeURL} target="_blank" rel="noopener noreferrer">{currentDiet.dietRecipeURL}</a></p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Like;

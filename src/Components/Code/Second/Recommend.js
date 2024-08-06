import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Re from "../../Img/Re.png";
import LikeButton1 from "../../Img/LikeButton1.png";
import LikeButton2 from "../../Img/LikeButton2.png";
import "./Recommend.css";

function Recommend() {
  const [userName, setUserName] = useState("");
  const [diet, setDiet] = useState({
    dietTitle: "오트밀",
    dietImageURL: "",
    dietRecipeURL: "",
    dietBenefit: "효능",
    dietNutrition: "",
    dietId: ""
  });
  const [likeImage, setLikeImage] = useState(LikeButton2);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/user/${userId}`);
      
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

  const fetchDiet = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setDiet({
          dietTitle: data.dietTitle,
          dietImageURL: data.dietImageURL,
          dietRecipeURL: data.dietRecipeURL,
          dietBenefit: data.dietBenefit,
          dietNutrition: data.dietNutrition,
          dietId: data.dietId
        });
        setLikeImage(LikeButton2); // 식단이 초기화될 때 likeImage를 초기화
      } else {
        console.error('Error fetching diet:', data);
        alert("보여드릴 식단이 없습니다.");
        setLikeImage(LikeButton2); // 오류가 발생해도 likeImage를 초기화
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      setDiet({
        dietTitle: "오트밀",
        dietImageURL: "https://via.placeholder.com/260",
        dietRecipeURL: "https://www.example.com/recipe",
        dietBenefit: "식이섬유가 풍부하고, 혈당 수치를 안정시켜요. 콜레스테롤 수치를 낮추는 데 도움이 돼요.",
        dietNutrition: "칼로리: 100kcal, 단백질: 5g",
      });
      setLikeImage(LikeButton2); // 오류가 발생해도 likeImage를 초기화
    }
  };

  const handleLikeClick = async () => {
    const userId = localStorage.getItem('userId');
    console.log("dietId:", diet.dietId); // dietId가 제대로 설정되었는지 확인
    if (likeImage === LikeButton2) {
      setLikeImage(LikeButton1);
      try {
        const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/diet/likes/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diet_id: diet.dietId
          })
        });

        const text = await response.text();
        console.log(text); // 서버 응답을 텍스트로 출력

        if (!response.ok) {
          console.error('Error liking diet:', response.statusText);
          alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      setLikeImage(LikeButton2);
      try {
        const response = await fetch(`http://ec2-54-85-193-202.compute-1.amazonaws.com:8080/api/diet/likes/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diet_id: diet.dietId
          })
        });

        const text = await response.text();
        console.log(text); // 서버 응답을 텍스트로 출력

        if (response.ok) {
          try {
            console.log(text);
          } catch (e) {
            console.error('Error parsing JSON:', e);
            alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          console.error('Error unliking diet:', text);
          alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchDiet();
  }, []);

  return (
    <>
      <div className="RecommendDiv">
        <div className="RecommendTitle">
          <h3>{userName} 님을 위한</h3>
          <h3>오늘의 <span className="green">식단</span> 추천</h3>
        </div>
        <div className="RecommendMeal">
          <div className="meal-image">
            <img src={diet.dietImageURL} alt={diet.dietTitle}></img>
          </div>
          <div className="RecommendBar">
            <img src={Re} alt="새로고침" onClick={fetchDiet}></img>
            <p className="meal-name">{diet.dietTitle}</p>
            <img src={likeImage} alt="좋아요" onClick={handleLikeClick}></img>
          </div>
          <div className="RecommendDes">
            <h3 className="meal-function">효능</h3>
            <p className="meal-function">{diet.dietBenefit}</p><br/>
            <h3 className="meal-function">영양소</h3>
            <p className="meal-function">{diet.dietNutrition}</p><br/>
            <h3 className="meal-recipe">레시피 보러가기</h3>
            <p className="meal-recipe"><a href={diet.dietRecipeURL} target="_blank" rel="noopener noreferrer">{diet.dietRecipeURL}</a></p>
          </div>
        </div>
        {/*<button onClick={() => navigate("/")}>home으로 이동</button>*/}
      </div>
      <Footer />
    </>
  );
}

export default Recommend;

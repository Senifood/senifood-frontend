import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthInfo.css";

function HealthInfo3() {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [otherCondition, setOtherCondition] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 userId 가져오기

  const handleConditionClick = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleNext = async () => {
    const answers = {
      answer1: JSON.parse(localStorage.getItem('answer1')),
      answer2: JSON.parse(localStorage.getItem('answer2')),
      answer3: selectedConditions.concat(otherCondition.split(',')).filter(Boolean)
    };

    try {
      const response = await fetch(`https://jocular-elf-62138c.netlify.app/api/survey/${userId}`, { // 예시 엔드포인트
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("설문조사가 완료되었습니다!");
        navigate("/recommend");
      } else {
        alert("설문조사 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="HealthInfoDiv">
      <div className="HealthInfoBar">
        <div className="HealthInfoProgress3"></div>
      </div>
      <h2>현재 복용중인 약물이 있나요?</h2>
      <p>(기타 사항에는 ','로 구분해서 작성해주세요)</p>
      <div className="condition-buttons">
        <button
          className={`condition-button unique-button ${selectedConditions.includes("없음") ? "active" : ""}`}
          onClick={() => handleConditionClick("없음")}
        >
          없음
        </button>
        <button
          className={`condition-button ${selectedConditions.includes("갑각류 알레르기") ? "active" : ""}`}
          onClick={() => handleConditionClick("갑각류 알레르기")}
        >
          갑각류 알레르기
        </button>
        <input
          type="text"
          placeholder="기타 (직접 입력)"
          className={`condition-button ${otherCondition ? "active" : ""}`}
          value={otherCondition}
          onChange={(e) => setOtherCondition(e.target.value)}
        />
        <button className="HealthInfoButton unique-button" onClick={handleNext}>
          설문 완료
        </button>
        <span>설문 결과를 통해 맞춤형 식단을 </span>
        <p>추천해드려요.</p>
      </div>
      {/*<button onClick={goToHome}>home으로 이동</button>*/}
    </div>
  );
}

export default HealthInfo3;

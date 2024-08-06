import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthInfo.css";

function HealthInfo2() {
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [otherCondition, setOtherCondition] = useState("");
  const navigate = useNavigate();

  const handleConditionClick = (condition) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleNext = () => {
    const answer2 = selectedConditions.concat(otherCondition.split(',')).filter(Boolean);
    localStorage.setItem('answer2', JSON.stringify(answer2));
    navigate("/HealthInfo3");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="HealthInfoDiv">
      <div className="HealthInfoBar">
        <div className="HealthInfoProgress2"></div>
      </div>
      <h2>알레르기가 있다면 알려주세요!</h2>
      <p>(중복 선택 가능)</p>
      <p>(기타 사항에는 ','로 구분해서 작성해주세요)</p>
      <div className="condition-buttons">
        <button
          className={`condition-button ${selectedConditions.includes("없음") ? "active" : ""}`}
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
        <button
          className={`condition-button ${selectedConditions.includes("밀 알레르기") ? "active" : ""}`}
          onClick={() => handleConditionClick("밀 알레르기")}
        >
          밀 알레르기
        </button>
        <button
          className={`condition-button ${selectedConditions.includes("생선 알레르기") ? "active" : ""}`}
          onClick={() => handleConditionClick("생선 알레르기")}
        >
          생선 알레르기
        </button>
        <input
          type="text"
          placeholder="기타 (직접 입력)"
          className={`condition-button ${otherCondition ? "active" : ""}`}
          value={otherCondition}
          onChange={(e) => setOtherCondition(e.target.value)}
        />
        <button className="HealthInfoButton" onClick={handleNext}>
          다음 단계 넘어가기
        </button>
      </div>
      <button onClick={goToHome}>home으로 이동</button>
    </div>
  );
}

export default HealthInfo2;

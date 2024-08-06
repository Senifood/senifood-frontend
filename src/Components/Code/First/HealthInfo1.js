import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HealthInfo.css";

function HealthInfo1() {
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
    const answer1 = selectedConditions.concat(otherCondition.split(',')).filter(Boolean);
    localStorage.setItem('answer1', JSON.stringify(answer1));
    navigate("/HealthInfo2");
  };

  return (
    <div className="HealthInfoDiv">
      <div className="HealthInfoBar">
        <div className="HealthInfoProgress1"></div>
      </div>
      <h2>현재 건강 상태를 알려주세요!</h2>
      <p>(중복 선택 가능)</p>
      <p>(기타 사항에는 ','로 구분해서 작성해주세요)</p>
      <div className="condition-buttons">
        <button
          className={`condition-button ${selectedConditions.includes("고혈압") ? "active" : ""}`}
          onClick={() => handleConditionClick("고혈압")}
        >
          고혈압
        </button>
        <button
          className={`condition-button ${selectedConditions.includes("당뇨병") ? "active" : ""}`}
          onClick={() => handleConditionClick("당뇨병")}
        >
          당뇨병
        </button>
        <button
          className={`condition-button ${selectedConditions.includes("고지혈증") ? "active" : ""}`}
          onClick={() => handleConditionClick("고지혈증")}
        >
          고지혈증
        </button>
        <button
          className={`condition-button ${selectedConditions.includes("골관절염") ? "active" : ""}`}
          onClick={() => handleConditionClick("골관절염")}
        >
          골관절염
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
    </div>
  );
}

export default HealthInfo1;

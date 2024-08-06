import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: password
        })
      });

      //if (!response.ok) {
        //console.error('HTTP error:', response.status);
        //alert("로그인에 실패했습니다. 다시 시도해주세요.");
        //return;
      //}

      const data = await response.json();
      console.log(data); // 응답 데이터 확인

      if (data.userId) {
        localStorage.setItem('userId', data.userId); // 서버에서 반환된 userId를 로컬 스토리지에 저장

        // 사용자가 healthinfo를 작성한 적이 있는지 확인하는 요청
        const surveyResponse = await fetch(`${process.env.BACKEND_URL}/api/survey/responses/check/${data.userId}`);
        const surveyData = await surveyResponse.json();

        if (surveyResponse.ok && surveyData === true) {
          navigate("/recommend");
        } else {
          navigate("/HealthInfo1");
        }
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="LoginDiv">
      <h2 className="LoginTitle">로그인</h2>
      <p className="LoginName">전화번호 (‘-’구분없이 입력)</p>
      <input
        type="text"
        placeholder="010-0000-0000"
        className="LoginInput"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <p className="LoginName">비밀번호</p>
      <input
        type="password"
        placeholder="XXXXXXXX"
        className="LoginInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="LoginMinor">
        <p>아직 계정이 없으신가요?</p>
        <a href="/signup" onClick={() => navigate("/signup")}>회원가입</a>
      </div>
      <button className="LoginButton" onClick={handleLogin}>
        로그인
      </button>
      {/*<button onClick={goToHome}>home으로 이동</button>*/}
    </div>
  );
}

export default Login;

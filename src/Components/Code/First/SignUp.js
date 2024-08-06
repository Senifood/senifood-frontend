import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Back from "../../Img/Back.png";

function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [errorFields, setErrorFields] = useState({});

  const navigate = useNavigate();

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const validateAndSignUp = async () => {
    // 공백 제거
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAge = age.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // 초기화
    setErrorFields({});

    // 유효성 검사
    const nameRegex = /^[가-힣]{2,}$/; // 한글 2자리 이상
    const phoneRegex = /^[0-9]{11}$/; // 숫자 11자리
    const ageRegex = /^[0-9]+$/; // 숫자
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/; // 영문/숫자 조합 8-16자리

    let valid = true;
    if (!nameRegex.test(trimmedName)) {
      setErrorFields(prev => ({ ...prev, name: true }));
      alert("이름은 한글로 2자리 이상이어야 합니다.");
      valid = false;
    }
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorFields(prev => ({ ...prev, phone: true }));
      alert("휴대폰 번호는 숫자로 11자리를 입력해야 합니다.");
      valid = false;
    }
    if (!ageRegex.test(trimmedAge)) {
      setErrorFields(prev => ({ ...prev, age: true }));
      alert("나이는 숫자로 입력해야 합니다.");
      valid = false;
    }
    if (!passwordRegex.test(trimmedPassword)) {
      setErrorFields(prev => ({ ...prev, password: true }));
      alert("비밀번호는 영문/숫자로 8-16자리를 입력해야 합니다.");
      valid = false;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setErrorFields(prev => ({ ...prev, confirmPassword: true }));
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      valid = false;
    }
    if (!gender) {
      setErrorFields(prev => ({ ...prev, gender: true }));
      alert("성별을 선택해주세요.");
      valid = false;
    }

    if (valid) {
      // 모든 유효성 검사를 통과한 경우
      try {
        const response = await fetch('https://senifood-backend-rocif.run.goorm.site/api/user/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            phone: trimmedPhone,
            age: parseInt(trimmedAge),
            password: trimmedPassword,
            confirm_password: trimmedConfirmPassword,
            gender: gender === "남성" ? 0 : 1
          })
        });
        
        const data = await response.json();
        console.log(data); // 응답 데이터 확인

        if (data.status === "OK") {
          alert("회원가입이 되었습니다!");
          navigate("/login");
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const goToBefore = () => {
    navigate("/login");
  };

  return (
    <div className="SignUpDiv">
      <div className="SignUpTitle">
        <img src={Back} onClick={goToBefore} alt="뒤로가기"></img>
        <h2>회원가입</h2>
      </div>
      <p className={`SignUpName ${errorFields.name ? "error" : ""}`}>이름</p>
      <input
        type="text"
        placeholder="이름"
        className="SignUpInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className={`SignUpName ${errorFields.phone ? "error" : ""}`}>휴대폰 번호</p>
      <input
        type="text"
        placeholder="‘-’구분없이 입력"
        className="SignUpInput"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <p className={`SignUpName ${errorFields.age ? "error" : ""}`}>나이</p>
      <input
        type="text"
        placeholder="나이 입력"
        className="SignUpInput"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <p className={`SignUpName ${errorFields.password ? "error" : ""}`}>비밀번호</p>
      <input
        type="password"
        placeholder="8-16자의 영문/숫자를 조합하여 입력"
        className="SignUpInput"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className={`SignUpName ${errorFields.confirmPassword ? "error" : ""}`}>비밀번호 확인</p>
      <input
        type="password"
        placeholder="비밀번호 확인"
        className="SignUpInput"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div>
        <p className={`SignUpName SignUpGender ${errorFields.gender ? "error" : ""}`}>성별</p>
        <div className="gender-buttons">
          <button
            className={`gender-button ${gender === "남성" ? "active" : ""}`}
            onClick={() => handleGenderChange("남성")}
          >
            남성
          </button>
          <button
            className={`gender-button ${gender === "여성" ? "active" : ""}`}
            onClick={() => handleGenderChange("여성")}
          >
            여성
          </button>
        </div>
      </div>
      <button className="SignUpButton" onClick={validateAndSignUp}>
        회원가입
      </button>
      {/*<button onClick={goToHome}>home으로 이동</button>*/}
    </div>
  );
}

export default SignUp;

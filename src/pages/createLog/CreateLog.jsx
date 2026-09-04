import { useState } from "react";

import BackgroundSelector from "./BackgroundSelector.jsx";

import btnVisibilityOff from "../../assets/btn_visibility_off_24px.svg";
import btnVisibilityOn from "../../assets/btn_visibility_on_24px.svg";

import styles from "./createLog.module.css";

function CreateLog() {
  // const navigate = useNavigate();
  const [selectedBackground, setSelectedBackground] = useState("bgGreen");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);

  const handleBtnVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleBtnConfirmVisibility = () => {
    setIsPasswordConfirmVisible((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("폼이 제출되었습니다.");
  };

  return (
    <div className={styles.contianer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <span className={styles.title}>로그 만들기</span>
          <label>
            닉네임
            <input
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              required
              type="text"
            />
          </label>
          <label>
            로그 이름
            <input
              name="name"
              placeholder="로그 이름을 입력해주세요"
              required
              type="text"
            />
          </label>
          <label>
            소개
            <textarea
              name="description"
              placeholder="소개 멘트를 작성해주세요"
              type="text"
            ></textarea>
          </label>

          <fieldset>
            <legend>배경을 선택해주세요</legend>
            <BackgroundSelector
              value={selectedBackground}
              onChange={setSelectedBackground}
            />
          </fieldset>

          <label>
            비밀번호
            <div className={styles.passwordInputWrapper}>
              <input
                name="password"
                placeholder="비밀번호를 입력해 주세요"
                required
                type={isPasswordVisible ? "text" : "password"}
                className={styles.inputPassword}
              />
              <button
                type="button"
                className={styles.btnVisibility}
                onClick={handleBtnVisibility}
              >
                <img
                  alt={
                    isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보이기"
                  }
                  src={isPasswordVisible ? btnVisibilityOn : btnVisibilityOff}
                />
              </button>
            </div>
          </label>
          <label>
            비밀번호 확인
            <div className={styles.passwordInputWrapper}>
              <input
                name="passwordConfirm"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                required
                type={isPasswordConfirmVisible ? "text" : "password"}
                className={styles.inputPassword}
              />
              <button
                type="button"
                className={styles.btnVisibility}
                onClick={handleBtnConfirmVisibility}
              >
                <img
                  alt={
                    isPasswordConfirmVisible
                      ? "비밀번호 숨기기"
                      : "비밀번호 보이기"
                  }
                  src={
                    isPasswordConfirmVisible
                      ? btnVisibilityOn
                      : btnVisibilityOff
                  }
                />
              </button>
            </div>
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          만들기
        </button>
      </form>
    </div>
  );
}
export default CreateLog;

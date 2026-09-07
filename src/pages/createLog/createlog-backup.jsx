import { useState } from "react";

import { createLog } from "../../api/logs.js";

import BackgroundSelector from "./BackgroundSelector.jsx";

import btnVisibilityOff from "../../assets/btn_visibility_off_24px.svg";
import btnVisibilityOn from "../../assets/btn_visibility_on_24px.svg";

import styles from "./createLog.module.css";

function CreateLog() {
  // const navigate = useNavigate();
  // 입력값 state
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("bgGreen");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  // 비밀번호 가시화/비가시화 버튼
  const handleBtnVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleBtnConfirmVisibility = () => {
    setIsPasswordConfirmVisible((prev) => !prev);
  };

  // 각 항목별 에러 메시지 모음
  const [errors, setErrors] = useState({
    nickname: "",
    name: "",
    password: "",
    passwordConfirm: "",
    form: "",
  });

  // 폼 제출 기능
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nickname.trim()) {
      setErrors.nickname("닉네임을 입력해주세요");
      return;
    }
    if (!name.trim()) {
      setErrors.name("로그 이름을 입력해주세요");
      return;
    }
    if (!password.trim()) {
      setErrors.password("비밀번호를 입력해주세요");
      return;
    }
    if (!passwordConfirm.trim()) {
      setErrors.passwordConfirm("비밀번호 확인을 입력해주세요");
      return;
    } else if (password !== passwordConfirm) {
      setErrors.passwordConfirm("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 오류 메시지 통합 관리
    // const nextErrors = {
    //   nickname: "",
    //   name: "",
    //   password: "",
    //   passwordConfirm: "",
    //   form: "",
    // };

    // 입력값 검증
    // if (!nickname.trim()) {
    //   nextErrors.nickname = "닉네임을 입력해주세요";
    // }
    // if (!name.trim()) {
    //   nextErrors.name = "로그 이름을 입력해주세요";
    // }
    // if (!password.trim()) {
    //   nextErrors.password = "비밀번호를 입력해주세요";
    // }
    // if (!passwordConfirm.trim()) {
    //   nextErrors.passwordConfirm = "비밀번호 확인을 입력해주세요";
    // } else if (password !== passwordConfirm) {
    //   nextErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    // }

    // 폼 데이터 읽기
    // const form = event.target;
    // const formData = new FormData(form);

    // 배경값이 폼에 안들어가서 직접 지정
    // const logData = {
    //   nickname: formData.get("nickname"),
    //   name: formData.get("name"),
    //   description: formData.get("description"),
    //   background: selectedBackground,
    //   password: formData.get("password"),
    //   passwordConfirm: formData.get("passwordConfirm"),
    // };

    const logData = {
      nickname: nickname.trim(),
      name: name.trim(),
      description: description.trim() || null,
      background: selectedBackground,
      password,
      passwordConfirm,
    };

    try {
      const createdLog = await createLog(logData);
      console.log("로그가 생성되었습니다: ", createdLog);
      // 생성된 로그 페이지로 이동하는 코드 필요
    } catch (error) {
      const message = error.message || "로그 생성에 실패했습니다.";
      setErrors((prev) => ({
        ...prev,
        form: message,
      }));
      console.log(errors);
    }

    // 폼 데이터 전송하기
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
              aria-describedby="nickname-error"
              aria-required="true"
              placeholder="닉네임을 입력해주세요"
              required
              type="text"
              onChange={(event) => setNickname(event.target.value)}
            />
            {errors.form && <p className={styles.formError}>{errors.form}</p>}
          </label>
          <label>
            로그 이름
            <input
              name="name"
              placeholder="로그 이름을 입력해주세요"
              required
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            소개
            <textarea
              name="description"
              placeholder="소개 멘트를 작성해주세요"
              type="text"
              onChange={(event) => setDescription(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
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
                onChange={(event) => setPasswordConfirm(event.target.value)}
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

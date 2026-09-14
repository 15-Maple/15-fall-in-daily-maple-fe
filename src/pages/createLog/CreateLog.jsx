import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createLog, getLogById } from "../../api/logs.js";

import BackgroundSelector from "./BackgroundSelector.jsx";

import btnVisibilityOff from "../../assets/btn_visibility_off_24px.svg";
import btnVisibilityOn from "../../assets/btn_visibility_on_24px.svg";

import styles from "./createLog.module.css";

function CreateLog() {
  const navigate = useNavigate();
  // isBtnActive가 true 일 때만 작동하도록 하기

  // 입력값 state
  const [selectedBackground, setSelectedBackground] = useState("bgGreen");
  const [form, setForm] = useState({
    nickname: "",
    name: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  // 한글 조합 감지
  const [isComposing, setIsComposing] = useState(false);

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
  const errors = {
    nickname:
      touched.nickname && !form.nickname.trim() ? "*닉네임을 입력해주세요" : "",
    name: touched.name && !form.name.trim() ? "*로그 이름을 입력해주세요" : "",
    password:
      touched.password && !form.password.trim()
        ? "*비밀번호를 입력해주세요"
        : "",
    passwordConfirm:
      touched.passwordConfirm && !form.passwordConfirm.trim()
        ? "*비밀번호 확인을 입력해주세요"
        : touched.passwordConfirm && form.password !== form.passwordConfirm
          ? "*비밀번호가 일치하지 않습니다."
          : "",
  };

  // 한글 입력 조합 시작
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 한글 입력 조합 끝
  const handleCompositionEnd = (event) => {
    const { name, value } = event.target;
    setIsComposing(false);

    // 비밀번호 입력시 영문, 숫자 제외 차단
    if (name === "password" || name === "passwordConfirm") {
      setForm((prev) => ({
        ...prev,
        [name]: value.replace(/[^0-9a-zA-Z]/g, ""),
      }));
    }
    // 한글 조합중일때는 입력창에 남아있는데 포커스를 잃으면 사라진다.
  };

  // 입력 내용 변경시 작동
  const handleChange = (event) => {
    const { name, value } = event.target;

    // 한글 조합 중 비밀번호값 즉시 replace 안함
    if (isComposing && (name === "password" || name === "passwordConfirm")) {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    // 항목별 입력 제한
    const sanitizeByField = {
      nickname: (value) => value.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, ""),

      // 스터디 이름은 공백 허용
      name: (value) => value.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]/g, ""),

      // 비밀번호는 한글 제외
      password: (value) => value.replace(/[^0-9a-zA-Z]/g, ""),
      passwordConfirm: (value) => value.replace(/[^0-9a-zA-Z]/g, ""),
    };

    const sanitizer = sanitizeByField[name];
    const sanitizedValue = sanitizer ? sanitizer(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    setFormError("");
  };

  // 입력창 포커스 없어지면 작동
  const handleBlur = (event) => {
    const { name } = event.target;
    // 한 번이라도 클릭했다면 touched 배열에 저장
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // 폼 제출 기능
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 아무것도 입력하지 않고 만들기를 누르면 모든 필수 항목 오류 나타나도록 하기
    setTouched({
      nickname: true,
      name: true,
      password: true,
      passwordConfirm: true,
    });

    // 오류 검사 - 필수 항목 누락 확인
    const hasError =
      !form.nickname.trim() ||
      !form.name.trim() ||
      !form.password.trim() ||
      !form.passwordConfirm.trim() ||
      form.password !== form.passwordConfirm;

    if (hasError) return;

    // 폼에 입력한 데이터 + 배경값
    const logData = {
      nickname: form.nickname.trim(),
      name: form.name.trim(),
      description: form.description.trim() || null,
      background: selectedBackground,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
    };

    try {
      const createdLog = await createLog(logData);
      const { logId } = createdLog;

      if (!logId) {
        throw new Error("생성된 로그 ID를 확인할 수 없습니다.");
      }

      console.log("로그가 생성되었습니다: ", createdLog);

      // 생성된 로그 id로 조회하기
      const fetchedLog = await getLogById(logId);

      // logDetail/id 페이지로 이동하기
      navigate(`/logdetail/${logId}`, {
        replace: true,
        state: { log: fetchedLog },
      });
    } catch (error) {
      const message = error.message || "로그 생성에 실패했습니다.";
      console.log(message);
    }

    // 폼 데이터 전송하기
  };

  return (
    <div className={styles.contianer}>
      <form noValidate onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <span className={styles.title}>로그 만들기</span>
          <label>
            닉네임
            <div className={styles.inputWrapper}>
              <input
                name="nickname"
                aria-describedby="nickname-error"
                aria-required="true"
                placeholder="닉네임을 입력해주세요"
                type="text"
                value={form.nickname}
                className={errors.nickname ? styles.errorInput : ""}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.nickname && (
                <p className={styles.inputError}>{errors.nickname}</p>
              )}
            </div>
          </label>
          <label>
            로그 이름
            <div className={styles.inputWrapper}>
              <input
                name="name"
                placeholder="로그 이름을 입력해주세요"
                type="text"
                value={form.name}
                className={errors.name ? styles.errorInput : ""}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && (
                <p className={styles.inputError}>{errors.name}</p>
              )}
            </div>
          </label>
          <label>
            소개
            <textarea
              name="description"
              placeholder="소개 멘트를 작성해주세요"
              value={form.description}
              onChange={handleChange}
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
            <div className={styles.inputWrapper}>
              <div
                className={`${styles.passwordInputWrapper} ${errors.password ? styles.errorInputWrapper : ""}`}
              >
                <input
                  name="password"
                  placeholder="비밀번호를 입력해 주세요"
                  type={isPasswordVisible ? "text" : "password"}
                  value={form.password}
                  className={styles.inputPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onCompositionEnd={handleCompositionEnd}
                  onCompositionStart={handleCompositionStart}
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
              {errors.password && (
                <p className={styles.inputError}>{errors.password}</p>
              )}
            </div>
          </label>
          <label>
            비밀번호 확인
            <div className={styles.inputWrapper}>
              <div
                className={`${styles.passwordInputWrapper} ${errors.passwordConfirm ? styles.errorInputWrapper : ""}`}
              >
                <input
                  name="passwordConfirm"
                  placeholder="비밀번호를 다시 한 번 입력해 주세요"
                  type={isPasswordConfirmVisible ? "text" : "password"}
                  value={form.passwordConfirm}
                  className={styles.inputPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onCompositionEnd={handleCompositionEnd}
                  onCompositionStart={handleCompositionStart}
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
              {errors.passwordConfirm && (
                <p className={styles.inputError}>{errors.passwordConfirm}</p>
              )}
            </div>
          </label>
          {formError && <p className={styles.formError}>{formError}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>
          만들기
        </button>
      </form>
    </div>
  );
}
export default CreateLog;

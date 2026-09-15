import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createLog, getLogById, nameCheck } from "../api/logs.js";

import BackgroundSelector from "../components/common/BackgroundSelector.jsx";
import Modal from "../components/common/Modal.jsx";

import btnVisibilityOff from "../assets/btn_visibility_off_24px.svg";
import btnVisibilityOn from "../assets/btn_visibility_on_24px.svg";

import styles from "./createLog.module.css";

function CreateLog() {
  const navigate = useNavigate();

  const MAXLENGTH = {
    nickname: 12,
    name: 20,
    description: 140,
    password: 15,
    passwordConfirm: 15,
  };
  // const [currentMaxLength, setCurrentMaxLength] = useState(MAXLENGTH);

  // 입력값 state
  const [selectedBackground, setSelectedBackground] = useState("bgGreen");
  const [form, setForm] = useState({
    nickname: "",
    name: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  // 입력창 클릭 여부
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  // 로그 이름 중복 검사 실시 여부(중복 검사 했을 때: true)
  const [isNameChecked, setIsNameChecked] = useState(false);
  // 로그 이름 중복 검사 통과 여부
  const [isNamePassedDupCheck, setIsNamePassedDupCheck] = useState(false);
  // 중복 검사에 사용한 이름 저장
  const [checkedName, setCheckedName] = useState("");
  // 중복 검사중인지 확인
  const [isNameChecking, setIsNameChecking] = useState(false);

  // 제출 모달 표시 여부
  const [showNoSubmitAlert, setShowNoSubmitAlert] = useState(false);

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
        ? "*비밀번호를 입력해 주세요"
        : "",
    passwordConfirm:
      touched.passwordConfirm && !form.passwordConfirm.trim()
        ? "*비밀번호 확인을 입력해주세요"
        : touched.passwordConfirm && form.password !== form.passwordConfirm
          ? "*비밀번호가 일치하지 않습니다."
          : "",
  };

  // 로그 이름 중복 검사 응답 양식
  const nameCheckMessage =
    isNameChecked && form.name.trim()
      ? isNamePassedDupCheck
        ? "*사용 가능한 로그 이름입니다."
        : "*이미 존재하는 로그 이름입니다."
      : "";

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
    // name: {nickname, name, description, password, password}
    const { name, value } = event.target;

    // 지금 변경된 입력창이 로그 이름 입력창인지 확인: 로그 이름 중복검사 위함
    if (name === "name") {
      setIsNameChecked(false);
      setIsNamePassedDupCheck(false);
      setCheckedName("");
    }
    // 이름 변경 감지되면 이전에 통과했어도 다시 비활성화.

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

  // 로그 이름 중복 검사
  const handleNameCheck = async (event) => {
    // 기본 폼 제출 동작 방지
    event.preventDefault();

    // // 중복 검사 실시 여부: true
    // setIsNameChecked(true);

    // 중복 검사 버튼을 누른 시점의 name을 검사 대상으로 선언
    const currentName = form.name.trim();

    // 이름 입력 없으면 경고 띄우기
    if (!currentName) {
      setTouched((prev) => ({
        ...prev,
        name: true,
      }));
      setIsNameChecked(false);
      setIsNamePassedDupCheck(false);
      setCheckedName("");
      return;
    }

    setIsNameChecking(true);
    setIsNameChecked(false);
    setIsNamePassedDupCheck(false);
    setCheckedName("");

    // 현재 검사 대상인 currentName 중복 검사 api로 보낸다.
    try {
      // 검사 결과가 true이면 setIsNamePassedDupCheck(true)
      // 검사 전 현재 입력값 저장
      const currentName = form.name.trim();
      // 검사 시행
      const isNameDuplicated = await nameCheck(currentName);

      setIsNameChecked(true);
      setIsNamePassedDupCheck(!isNameDuplicated);
      setCheckedName(currentName);
    } catch (error) {
      // 검사 결과가 false 이면 setIsNamePassedDupCheck(false)
      setIsNameChecked(false);
      setIsNamePassedDupCheck(false);
      setCheckedName("");
      setFormError(error.message || "로그 이름 중복 확인에 실패했습니다.");
      setShowNoSubmitAlert(true);
    } finally {
      setIsNameChecking(false);
    }
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
      !isNameChecked ||
      !isNamePassedDupCheck ||
      checkedName !== form.name.trim() ||
      !form.password.trim() ||
      !form.passwordConfirm.trim() ||
      form.password !== form.passwordConfirm;

    if (hasError) {
      setShowNoSubmitAlert(true);
      return;
    }

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
                maxLength={MAXLENGTH.nickname}
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
              <div className={styles.nameWrapper}>
                <input
                  name="name"
                  maxLength={MAXLENGTH.name}
                  placeholder="로그 이름을 입력해주세요"
                  type="text"
                  value={form.name}
                  className={errors.name ? styles.errorInput : ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {/* 중복 확인 버튼 */}
                <button
                  disabled={isNameChecking}
                  type="button"
                  className={styles.nameCheckBtn}
                  onClick={handleNameCheck}
                >
                  {isNameChecking ? "확인 중..." : "중복 확인"}
                </button>
              </div>
              {errors.name && (
                <p className={styles.inputError}>{errors.name}</p>
              )}
              {nameCheckMessage && (
                <p
                  className={
                    isNamePassedDupCheck
                      ? styles.inputCorrect
                      : styles.inputError
                  }
                >
                  {nameCheckMessage}
                </p>
              )}
            </div>
          </label>

          <label>
            소개
            <textarea
              name="description"
              maxLength={MAXLENGTH.description}
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
                  maxLength={MAXLENGTH.password}
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
                  maxLength={MAXLENGTH.password}
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
      {/* 제출 불가 알림 */}
      {showNoSubmitAlert && (
        <Modal
          content="로그를 생성할 수 없습니다."
          isOpen={true}
          type="alert"
          onClose={() => {
            setShowNoSubmitAlert(false);
            // navigate(`/logdetail/${logId}`, {
            //   replace: true,
            // });
          }}
        />
      )}
    </div>
  );
}
export default CreateLog;

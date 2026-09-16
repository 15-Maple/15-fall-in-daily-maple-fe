import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { updateLog, getLogById, nameCheck } from "../api/logs.js";

import BackgroundSelector from "../components/common/BackgroundSelector.jsx";
import Modal from "../components/common/Modal.jsx";

import { TOKEN_PREFIX } from "../constants/auth.js";
import { ROUTES } from "../constants/routes.js";

import btnVisibilityOff from "../assets/btn_visibility_off_24px.svg";
import btnVisibilityOn from "../assets/btn_visibility_on_24px.svg";

import styles from "./createLog.module.css";

function UpdateLog() {
  const { logId } = useParams();
  const navigate = useNavigate();

  const MAXLENGTH = {
    nickname: 12,
    name: 20,
    description: 140,
    password: 15,
    passwordConfirm: 15,
  };

  // 입력 글자수
  const [inputCount, setInputCount] = useState({
    nickname: 0,
    name: 0,
    description: 0,
    password: 0,
    passwordConfirm: 0,
  });

  // 문자 수 계산 함수
  const getCharacterLength = (value = "") => {
    return [...value].length;
  };

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

  // 로그 이름 중복 검사 실시 여부(중복 검사 했을 때: true) -- 수정하기는 처음 데이터가 이미 통과한 데이터이므로 true
  const [isNameChecked, setIsNameChecked] = useState(true);
  // 로그 이름 중복 검사 통과 여부
  const [isNamePassedDupCheck, setIsNamePassedDupCheck] = useState(true);
  // 중복 검사에 사용한 이름 저장
  const [checkedName, setCheckedName] = useState("");
  // 중복 검사중인지 확인
  const [isNameChecking, setIsNameChecking] = useState(false);
  // 원래 이름 저장
  const [originalName, setOriginalName] = useState("");

  // 제출 모달 표시 여부
  const [showNoSubmitAlert, setShowNoSubmitAlert] = useState(false);

  // 한글 조합 감지
  const [isComposing, setIsComposing] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);

  // 접근권한 체크
  const hasToken = !!sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);
  const showNoAccessAlert = !hasToken;

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
      // 비밀번호 확인 클릭하고 비밀번호 확인 입력했는데 비밀번호 내용 없음
      touched.passwordConfirm &&
      !form.password.trim() &&
      form.passwordConfirm.trim()
        ? "*비밀번호를 입력해주세요"
        : "",
    passwordConfirm:
      // 비밀번호 클릭하고 비밀번호 입력했는데 비밀번호 확인 없음
      touched.password && form.password.trim() && !form.passwordConfirm.trim()
        ? "*비밀번호 확인을 입력해주세요"
        : touched.passwordConfirm &&
            form.password.trim() &&
            form.passwordConfirm.trim() &&
            form.password !== form.passwordConfirm
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

  // 현재 logid의 데이터 불러오기
  useEffect(() => {
    // 토큰이나 로그 id 없으면 return
    if (!hasToken || !logId) return;
    async function loadLog() {
      try {
        const log = await getLogById(logId);

        setForm({
          nickname: log.nickname ?? "",
          name: log.name ?? "",
          description: log.description ?? "",
          password: "",
          passwordConfirm: "",
        });
        setOriginalName(log.name.trim());
        setCheckedName(log.name.trim());
        setSelectedBackground(log.background);

        // 글자수 현재 값으로 업데이트
        setInputCount({
          nickname: getCharacterLength(log.nickname),
          name: getCharacterLength(log.name),
          description: getCharacterLength(log.description),
          password: 0,
          passwordConfirm: 0,
        });
      } catch (error) {
        const message =
          error.response?.data?.message || "로그 정보를 불러오지 못했습니다.";
        setFormError(message);
      }
    }

    loadLog();
  }, [logId, hasToken]);

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
    // 이름 변경 감지되면 이전에 통과했어도 다시 비활성화.
    const { name: inputType, value } = event.target;

    // 한글 조합 중 비밀번호값 즉시 replace 안함
    if (
      isComposing &&
      (inputType === "password" || inputType === "passwordConfirm")
    ) {
      setForm((prev) => ({
        ...prev,
        [inputType]: value,
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

    const sanitizer = sanitizeByField[inputType];
    const sanitizedValue = sanitizer ? sanitizer(value) : value;

    // 글자수 바이트로 변환
    setInputCount((prev) => ({
      ...prev,
      [inputType]: getCharacterLength(sanitizedValue),
    }));

    // 지금 변경된 입력창이 로그 이름 입력창인지 확인
    if (inputType === "name") {
      // 기존 이름과 같으면 중복 검사 필요
      if (value.trim() === originalName) {
        setIsNameChecked(true);
        setIsNamePassedDupCheck(true);
        setCheckedName(value.trim());
      } else if (inputType === "name" && value.trim() !== originalName) {
        setIsNameChecked(false);
        setIsNamePassedDupCheck(false);
        setCheckedName("");
      }
    }

    setForm((prev) => ({
      ...prev,
      [inputType]: sanitizedValue,
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
    });

    // 비밀번호 입력 없으면 PATCH 요청에서 제외
    const hasPasswordInput =
      form.password.trim() || form.passwordConfirm.trim();

    // 비밀번호, 비밀번호 확인 둘 중 하나라도 입력이 있는데 서로 일치하지 않은 경우 오류처리
    const hasPasswordError =
      hasPasswordInput &&
      (!form.password.trim() ||
        !form.passwordConfirm.trim() ||
        form.password !== form.passwordConfirm);

    const hasError =
      !form.nickname.trim() ||
      !form.name.trim() ||
      !isNameChecked ||
      !isNamePassedDupCheck ||
      checkedName !== form.name.trim() ||
      hasPasswordError;

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
    };
    // password 입력값이 있을 때만 넣기
    if (hasPasswordInput) {
      logData.password = form.password;
      logData.passwordConfirm = form.passwordConfirm;
    }

    try {
      // 로그 수정(update) api 요청
      const updatedLog = await updateLog(logId, logData);
      const { logId: updatedLogId } = updatedLog;

      if (!updatedLogId) {
        throw new Error("수정된 로그 ID를 확인할 수 없습니다.");
      }

      console.log("로그가 수정되었습니다: ", updatedLog);

      // 생성된 로그 id로 조회하기
      const fetchedLog = await getLogById(updatedLogId);

      // logdetail/id 페이지로 이동하기
      navigate(`/logdetail/${updatedLogId}`, {
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
          <span className={styles.title}>로그 수정하기</span>
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
              <div className={styles.inputInfo}>
                <p className={styles.inputError}>
                  {errors.nickname ? errors.nickname : ""}
                </p>
                <div className={styles.inputLengthCount}>
                  {inputCount.nickname}/{MAXLENGTH.nickname}
                </div>
              </div>
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
                  disabled={form.name.trim() === originalName || isNameChecking}
                  type="button"
                  className={styles.nameCheckBtn}
                  onClick={handleNameCheck}
                >
                  {isNameChecking ? "확인 중..." : "중복 확인"}
                </button>
              </div>
              <div className={styles.inputInfo}>
                {/* 에러 메시지와 중복 통과 메시지는 같은 자리에서 서로 교체  */}
                {/* 글자수는 오른쪽 고정 */}
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
                <div className={styles.inputLengthCount}>
                  {inputCount.name}/{MAXLENGTH.name}
                </div>
              </div>
              {/* {errors.name && (
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
              )} */}
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
            <div className={styles.inputLengthCount}>
              {inputCount.description}/{MAXLENGTH.description}
            </div>
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
                  placeholder="새 비밀번호 (변경 시에만 입력)"
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
              <div className={styles.inputInfo}>
                <p className={styles.inputError}>
                  {errors.password ? errors.password : ""}
                </p>
                <div className={styles.inputLengthCount}>
                  {inputCount.password}/{MAXLENGTH.password}
                </div>
              </div>
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
                  placeholder="새 비밀번호 확인"
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
              <div className={styles.inputInfo}>
                <p className={styles.inputError}>
                  {errors.passwordConfirm ? errors.passwordConfirm : ""}
                </p>
                <div className={styles.inputLengthCount}>
                  {inputCount.passwordConfirm}/{MAXLENGTH.passwordConfirm}
                </div>
              </div>
            </div>
          </label>
          {formError && <p className={styles.formError}>{formError}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>
          수정 완료
        </button>
      </form>
      {/* 접근권한 알럿 */}
      {showNoAccessAlert && (
        <Modal
          content="접근 권한이 없습니다."
          isOpen={true}
          type="alert"
          onClose={() => {
            navigate(logId ? `/logdetail/${logId}` : ROUTES.HOME, {
              replace: true,
            });
          }}
        />
      )}
      {/* 알럿 모달이 추가로 필요한 경우 새로 Modal을 추가해서 써주세요! */}
      {/* 제출 불가 알림 */}
      {showNoSubmitAlert && (
        <Modal
          content={
            isNamePassedDupCheck === false
              ? "로그 이름 중복 확인이 필요합니다."
              : "로그를 생성할 수 없습니다."
          }
          isOpen={true}
          type="alert"
          onClose={() => {
            setShowNoSubmitAlert(false);
          }}
        />
      )}
    </div>
  );
}
export default UpdateLog;

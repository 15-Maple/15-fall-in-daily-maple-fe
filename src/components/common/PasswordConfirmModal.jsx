import clsx from "clsx";
import { useState } from "react";
import ReactDOM from "react-dom";

import { verifyPasswordApi } from "../../api/auth";

import Button from "../ui/Button";
import Input from "../ui/Input";

import styles from "./PasswordConfirmModal.module.css";

/**
 * 비밀번호 확인 모달(Modal) 컴포넌트입니다.
 * 💡 React Portal을 사용하여 <div id="modal-root"> 내부에 렌더링됩니다.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달을 화면에 표시할지 여부
 * @param {() => void} props.onClose - 모달을 닫는 함수 (배경 클릭, 나가기 버튼, 확인/취소 시 동작)
 * @param {string} [props.title] - 모달 상단에 표시될 제목(log명)
 * @param {() => void} [props.onSuccess] - 비밀번호 검증 성공 시 실행할 함수 (페이지 이동 등)
 * @param {string} [props.confirmText="확인"] - 확인 버튼의 텍스트 (기본값: "확인")
 * @param {string} [props.closeText="나가기"] - 나가기 버튼의 텍스트 (prompt 모달에서만 표시됨, 기본값: "나가기")
 * @returns {JSX.Element | null}
 */
function PasswordConfirmModal({
  isOpen,
  onClose,
  title,
  onSuccess,
  confirmText = "확인",
  closeText = "나가기",
  logId,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // 열려있지 않으면 아무것도 그리지 않음
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      // 백엔드로 비밀번호 검증 요청
      const { token } = await verifyPasswordApi(logId, password);

      // 발급받은 출입증(token)을 sessionStorage에 저장
      // 키 이름에 logId를 넣어서 로그별로 출입증을 따로 관리
      sessionStorage.setItem(`log_token_${logId}`, token);

      // 성공 처리 (모달 닫기 & 다음 화면 이동)
      setError(null);
      setPassword("");
      onSuccess();
    } catch (err) {
      // API에서 401 에러(비밀번호 틀림)를 던진 경우
      setError({
        message:
          err.message || "비밀번호가 일치하지 않습니다. 다시 확인해 주세요.",
      });
    }
  };

  const handleClose = () => {
    setPassword("");
    setError(null);
    onClose();
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(null); // 다시 타이핑하면 에러 객체 초기화
  };

  return ReactDOM.createPortal(
    // 어두운 배경 (클릭 시 모달 닫힘)
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div
        className={styles.modalWrapper}
        onClick={(e) => e.stopPropagation()} // 박스 안을 클릭했을 때 모달이 닫히는 걸 막아줍니다.
      >
        <div className={styles.modalContent}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{title}</h3>
            <button
              type="button"
              className={clsx(styles.closeBtn, styles.closeBtnDesktop)}
              onClick={handleClose}
            >
              {closeText}
            </button>
          </div>
          <p className={styles.modalText}>권한이 필요해요!</p>
          <div className={styles.inputWrapper}>
            <Input
              error={error}
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              size="md"
              className={styles.confirmBtn}
              onClick={handleConfirm || handleClose}
            >
              {confirmText}
            </Button>
            <button
              type="button"
              className={clsx(styles.closeBtn, styles.closeBtnMobile)}
              onClick={handleClose}
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default PasswordConfirmModal;

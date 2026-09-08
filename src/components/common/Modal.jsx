import clsx from "clsx";
import ReactDOM from "react-dom";

import Button from "../ui/Button";

import styles from "./Modal.module.css";

const BUTTON_SIZES = {
  alert: "sm",
  confirm: "xs",
};

/**
 * 프로젝트 전체에서 공통으로 사용하는 모달(Modal) 컴포넌트입니다.
 * 💡 React Portal을 사용하여 <div id="modal-root"> 내부에 렌더링됩니다.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달을 화면에 표시할지 여부
 * @param {() => void} props.onClose - 모달을 닫는 함수 (배경 클릭, 나가기 버튼, 확인/취소 시 동작)
 * @param {"alert" | "confirm"} [props.type="alert"] - 모달의 형태 및 용도 (기본값: "alert")
 * @param {string} [props.content] - 모달 중앙에 표시될 텍스트 내용 (alert, confirm 용)
 * @param {() => void} [props.onConfirm] - '확인(혹은 커스텀 텍스트)' 버튼을 눌렀을 때 실행할 함수 (미입력 시 onClose 동작)
 * @param {string} [props.confirmText="확인"] - 확인 버튼의 텍스트 (기본값: "확인")
 * @param {string} [props.cancelText="취소"] - 취소 버튼의 텍스트 (confirm 모달에서만 표시됨, 기본값: "취소")
 * @returns {JSX.Element | null}
 */
function Modal({
  isOpen,
  onClose,
  type = "alert",
  content,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
}) {
  // 열려있지 않으면 아무것도 그리지 않음
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={clsx(styles.modalWrapper, styles[type])}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalText}>{content}</p>

          <div className={styles.buttonGroup}>
            {type === "confirm" && (
              <Button
                size={BUTTON_SIZES[type]}
                variant={"cancel"}
                className={styles.cancelBtn}
                onClick={onClose}
              >
                {cancelText}
              </Button>
            )}
            <Button
              size={BUTTON_SIZES[type]}
              className={styles.confirmBtn}
              onClick={onConfirm || onClose}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;

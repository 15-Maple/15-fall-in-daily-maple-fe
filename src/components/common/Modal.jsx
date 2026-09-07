import clsx from "clsx";
import ReactDOM from "react-dom";

import Button from "../ui/Button";

import styles from "./Modal.module.css";

const BUTTON_SIZES = {
  alert: "sm",
  confirm: "xs",
  prompt: "md",
};

/**
 * 프로젝트 전체에서 공통으로 사용하는 모달(Modal) 컴포넌트입니다.
 * 💡 React Portal을 사용하여 <div id="modal-root"> 내부에 렌더링됩니다.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달을 화면에 표시할지 여부
 * @param {() => void} props.onClose - 모달을 닫는 함수 (배경 클릭, 나가기 버튼, 확인/취소 시 동작)
 * @param {"alert" | "confirm" | "prompt" | "form"} [props.type="alert"] - 모달의 형태 및 용도 (기본값: "alert")
 * @param {string} [props.title] - 모달 상단에 표시될 제목 (prompt, form 등에서 주로 사용)
 * @param {string} [props.content] - 모달 중앙에 표시될 텍스트 내용 (alert, confirm, prompt 용)
 * @param {() => void} [props.onConfirm] - '확인(혹은 커스텀 텍스트)' 버튼을 눌렀을 때 실행할 함수 (미입력 시 onClose 동작)
 * @param {string} [props.confirmText="확인"] - 확인 버튼의 텍스트 (기본값: "확인")
 * @param {string} [props.cancelText="취소"] - 취소 버튼의 텍스트 (confirm 모달에서만 표시됨, 기본값: "취소")
 * @param {string} [props.closeText="나가기"] - 나가기 버튼의 텍스트 (prompt 모달에서만 표시됨, 기본값: "나가기")
 * @param {React.ReactNode} [props.children] - prompt의 input 영역이나 form 모달 내부의 전체 컨텐츠
 * @returns {JSX.Element | null}
 */
function Modal({
  isOpen,
  onClose,
  type = "alert",
  title,
  content,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  closeText = "나가기",
  children,
}) {
  // 열려있지 않으면 아무것도 그리지 않음
  if (!isOpen) return null;

  const renderContent = () => {
    // Alert, Confirm: 텍스트와 버튼을 내부에서 직접 그림
    if (type === "alert" || type === "confirm") {
      return (
        <div className={styles.modalContent}>
          <p className={styles.modalText}>{content}</p>

          <div className={styles.buttonGroup}>
            {/* Confirm일 때만 취소 버튼을 보여줍니다 */}
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
            {/* onConfirm 함수가 안 넘어오면 창을 닫음(onClose) */}
            <Button
              size={BUTTON_SIZES[type]}
              className={styles.confirmBtn}
              onClick={onConfirm || onClose}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      );
    }

    // 2. Prompt: 텍스트와 버튼을 내부에서 직접 그리고, input 영역을 children으로 받아옴
    if (type === "prompt") {
      return (
        <div className={styles.modalContent}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{title}</h3>
            <button
              type="button"
              className={clsx(styles.closeBtn, styles.closeBtnDesktop)}
              onClick={onClose}
            >
              {closeText}
            </button>
          </div>
          <p className={styles.modalText}>{content}</p>
          <div className={styles.inputWrapper}>{children}</div>
          <div className={styles.buttonGroup}>
            {/* onConfirm 함수가 안 넘어오면 창을 닫음(onClose) */}
            <Button
              size={BUTTON_SIZES[type]}
              className={styles.confirmBtn}
              onClick={onConfirm || onClose}
            >
              {confirmText}
            </Button>
            <button
              type="button"
              className={clsx(styles.closeBtn, styles.closeBtnMobile)}
              onClick={onClose}
            >
              {closeText}
            </button>
          </div>
        </div>
      );
    }

    // 3. Form일 때는 넘겨준 요소(children)를 그대로 return
    return children;
  };

  return ReactDOM.createPortal(
    // 어두운 배경 (클릭 시 모달 닫힘)
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={clsx(styles.modalWrapper, styles[type])}
        onClick={(e) => e.stopPropagation()} // 박스 안을 클릭했을 때 모달이 닫히는 걸 막아줍니다.
      >
        {renderContent()}
      </div>
    </div>,
    document.getElementById("modal-root"), // index.html의 Portal로 보냅니다.
  );
}

export default Modal;

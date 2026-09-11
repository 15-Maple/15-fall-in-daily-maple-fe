import clsx from "clsx";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./Toast.module.css";

function Toast({ variant, points, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const message =
    variant === "warning"
      ? "🚨 집중이 중단되었습니다."
      : `🎉 ${points}포인트를 획득했습니다!`;

  useEffect(() => {
    // 2.7초 뒤에 사라지는 애니메이션 시작
    const fadeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 2700);

    // 3초 뒤에 컴포넌트 완전히 삭제
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      role="alert"
      className={clsx(
        styles.toastWrapper,
        styles[variant],
        isClosing ? styles.fadeOut : styles.fadeIn,
      )}
    >
      <div className={styles.text}>{message}</div>
    </div>,
    document.getElementById("toast-root"),
  );
}

export default Toast;

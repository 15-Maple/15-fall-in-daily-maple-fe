import clsx from "clsx";

import startIcon from "../../assets/ic-play.svg";
import stopIcon from "../../assets/ic-stop.svg";

import styles from "./TimerButton.module.css";

/**
 * 스터디 타이머 시작 및 정지에 사용되는 전용 아이콘 버튼입니다.
 *
 * @param {Object} props
 * @param {"start" | "stop"} props.type - 버튼의 상태 타입 ("start" 또는 "stop")
 * @param {function} [props.onClick] - 클릭 시 실행할 이벤트 함수
 * @returns {JSX.Element}
 */
export default function TimerButton({ type, size, onClick }) {
  const isStart = type === "start";

  return (
    <button
      type="button"
      className={clsx(styles.timerBtn, styles[size])}
      onClick={onClick}
    >
      <div className={styles.imgWrapper}>
        <img alt={type} src={isStart ? startIcon : stopIcon} />
      </div>
      <span>{isStart ? "Start!" : "Stop!"}</span>
    </button>
  );
}

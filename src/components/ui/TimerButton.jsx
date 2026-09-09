import clsx from "clsx";

// 💡 추가된 아이콘들을 불러옵니다 (경로나 이름은 프로젝트에 맞게 수정하세요)
import pauseIcon from "../../assets/ic-pause.svg";
import startIcon from "../../assets/ic-play.svg";
import restartIcon from "../../assets/ic-restart.svg";
import stopIcon from "../../assets/ic-stop.svg";

import styles from "./TimerButton.module.css";

// 🌟 버튼의 종류에 따른 설정값들을 모아둔 사전(Dictionary)을 만듭니다.
const BUTTON_CONFIG = {
  start: { icon: startIcon, text: "Start!", shape: "pill" },
  stop: { icon: stopIcon, text: "Stop!", shape: "pill" },
  pause: { icon: pauseIcon, text: null, shape: "circle" },
  restart: { icon: restartIcon, text: null, shape: "circle" },
};

/**
 * 스터디 타이머 제어용 버튼 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {"start" | "stop" | "pause" | "restart"} props.variant - 버튼의 종류
 * @param {function} [props.onClick] - 클릭 시 실행할 이벤트 함수
 */
function TimerButton({ variant = "start", onClick, ...rest }) {
  // 현재 variant에 맞는 설정값을 가져옵니다.
  const currentConfig = BUTTON_CONFIG[variant];

  // 만약 잘못된 variant가 들어오면 아무것도 안 그리거나 기본 버튼을 보여줄 수 있습니다.
  if (!currentConfig) return null;

  return (
    <button
      type="button"
      // 💡 clsx를 사용해 공통 스타일(timerBtn)과 모양 스타일(pill 또는 circle)을 합쳐줍니다!
      className={clsx(styles.timerBtn, styles[currentConfig.shape])}
      onClick={onClick}
      {...rest}
    >
      <div className={styles.imgWrapper}>
        <img alt={variant} src={currentConfig.icon} />
      </div>

      {/* 💡 텍스트가 있는 경우(start, stop)에만 span을 그려줍니다. */}
      {currentConfig.text && <span>{currentConfig.text}</span>}
    </button>
  );
}

export default TimerButton;

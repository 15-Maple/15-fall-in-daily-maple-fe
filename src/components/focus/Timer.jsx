import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTimer, useStopwatch } from "react-timer-hook";

import { createFocusSession, finishFocus } from "../../api/focus";

import { TOKEN_PREFIX } from "../../constants/auth";
import Modal from "../common/Modal";
import PasswordConfirmModal from "../common/PasswordConfirmModal";
import TimerButton from "../ui/TimerButton";

import timerIcon from "../../assets/ic-timer.svg";

import styles from "./Timer.module.css";

const formatNumber = (num) => String(num).padStart(2, "0");

function Timer() {
  // 타이머
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  // 모달
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 패스워드 확인 모달
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // context
  const { logData, showToast } = useOutletContext();

  const logId = logData.id;

  // 스톱워치 설정(설정된 시간 종료 이후 처리)
  const {
    seconds: overSec,
    minutes: overMin,
    start: startOvertime,
    reset: resetOvertime,
  } = useStopwatch({ autoStart: false });

  const overtimeTimeoutRef = useRef(null);

  // 타이머 설정
  const { seconds, minutes, hours, isRunning, restart, pause, resume } =
    useTimer({
      expiryTimestamp: new Date(),
      autoStart: false,
      onExpire: async () => {
        // 목표 시간 도달 시점에 포인트 지급
        await handleFinishFocus();

        // state 초기화
        setIsFinished(true);
        startOvertime();

        // 10분 후 타이머 초기화
        overtimeTimeoutRef.current = setTimeout(
          () => {
            resetOvertime(null, false);
            setIsFinished(false);
            setIsTimerStarted(false);

            setAlertMessage("집중이 자동 종료되었습니다.");
            setIsAlertOpen(true);
          },
          10 * 60 * 1000,
        );
      },
    });

  const totalDisplayMinutes = hours * 60 + minutes;

  const handleStartTimer = () => {
    if (inputMinutes > 99) {
      setInputMinutes(99);
      setAlertMessage("최대 99분까지만 설정할 수 있습니다.");
      setIsAlertOpen(true);
      return;
    }
    if (inputSeconds > 59) {
      setInputSeconds(59);
      setAlertMessage("초는 최대 59초까지만 설정할 수 있습니다.");
      setIsAlertOpen(true);
      return;
    }

    const totalSecondsToAdd = inputMinutes * 60 + inputSeconds;

    // 10분 이상 설정
    if (totalSecondsToAdd < 600) {
      setAlertMessage("시간을 10분 이상으로 설정해주세요.");
      setIsAlertOpen(true);
      return;
    }

    const newEndTime = new Date();
    newEndTime.setSeconds(newEndTime.getSeconds() + totalSecondsToAdd);

    // 시작 세션 생성
    const targetSeconds = inputMinutes * 60 + inputSeconds;
    handleStartFocus(targetSeconds);

    // 초기화
    resetOvertime(null, false); // 스톱워치 끄기
    setIsFinished(false); // 초과 시간 모드 끄기
    setIsTimerStarted(true);

    // 타이머 시작
    restart(newEndTime);
  };

  // 시간 멈춤
  const handlePauseTimer = () => {
    pause();
    showToast("warning", "🚨 집중이 중단되었습니다.");
  };

  // 시간이 멈춘곳에서 다시 시작
  const handleResumeTimer = () => resume();

  // 재시작(restart 버튼)
  const handleRestartTimer = () => handleStartTimer();

  // 집중 완료(stop 버튼)
  const handleStopOvertime = () => {
    if (overtimeTimeoutRef.current) {
      clearTimeout(overtimeTimeoutRef.current);
      overtimeTimeoutRef.current = null;
    }
    resetOvertime(null, false);
    setIsFinished(false);
    setIsTimerStarted(false);
  };

  // api 통신: 집중 종료
  const handleFinishFocus = async () => {
    try {
      const earnedPoints = await finishFocus({ logId });
      showToast("success", `🎉 ${earnedPoints}포인트를 획득했습니다!`);
    } catch (error) {
      console.error("집중 종료 에러:", error.message);

      // 에러 코드가 401(권한 없음/토큰 만료)일 경우
      if (error.response?.status === 401 || error.message.includes("401")) {
        // 만료된 토큰 지움
        sessionStorage.removeItem(`${TOKEN_PREFIX}${logId}`);
        // 비밀번호 모달(다시 입력받고 이어서 처리)
        setIsPasswordModalOpen(true);
      } else {
        // 401이 아닌 다른 에러는 일반 alert
        setAlertMessage(error.message);
        setIsAlertOpen(true);
      }
    }
  };

  // api 통신: 집중 시작 세션 등록
  const handleStartFocus = async (targetSeconds) => {
    try {
      await createFocusSession({
        logId,
        targetSeconds,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // overtimeTimeoutRef 정리
  useEffect(() => {
    return () => {
      if (overtimeTimeoutRef.current) clearTimeout(overtimeTimeoutRef.current);
    };
  }, []);

  // 화면 출력 시간(타이머, 스톱워치)
  const currentMinutes = isFinished ? overMin : totalDisplayMinutes;
  const currentSeconds = isFinished ? overSec : seconds;

  return (
    <div className={styles.timerContainer}>
      {/* 목표시간 chip */}
      <div className={styles.chipWrapper}>
        <div
          className={clsx(
            styles.targetTimeChip,
            !isTimerStarted ? styles.hidden : "",
          )}
        >
          <div className={styles.timerIconWrapper}>
            <img alt="시계모양 아이콘" src={timerIcon} />
          </div>
          <div className={styles.targetTime}>
            {formatNumber(inputMinutes) + ":" + formatNumber(inputSeconds)}
          </div>
        </div>
      </div>

      {/* 타이머 영역 */}
      <div
        className={clsx(
          styles.timeDisplayArea,
          isTimerStarted ? styles.running : "",
          isFinished ? styles.finished : "",
        )}
      >
        {!isTimerStarted ? (
          // 1. 타이머 정지(입력 모드)
          <>
            <div className={styles.numberWrapper}>
              <input
                max="99"
                min="0"
                type="number"
                value={formatNumber(inputMinutes)}
                className={styles.hiddenInput}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
              />
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.numberWrapper}>
              <input
                max="59"
                min="0"
                type="number"
                value={formatNumber(inputSeconds)}
                className={styles.hiddenInput}
                onChange={(e) => setInputSeconds(Number(e.target.value))}
              />
            </div>
          </>
        ) : (
          // 2. 타이머 실행 중 (타이머 모드)
          <>
            {/* 마이너스 시간: '-' 기호 추가 */}
            {isFinished && <span className={styles.timeText}>-</span>}

            <div className={styles.numberWrapper}>
              <span className={styles.timeText}>
                {formatNumber(currentMinutes)}
              </span>
            </div>
            <span className={styles.colon}>:</span>
            <div className={styles.numberWrapper}>
              <span className={styles.timeText}>
                {formatNumber(currentSeconds)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className={styles.timerBtns}>
        {!isTimerStarted ? (
          // 시작 전: 시작 버튼
          <TimerButton variant="start" onClick={handleStartTimer} />
        ) : isFinished ? (
          // 집중 종료: 마이너스 + 스톱워치 -> Stop 버튼
          <TimerButton variant="stop" onClick={handleStopOvertime} />
        ) : (
          // 타이머 화면 (실행 중이거나 일시정지)
          <>
            <TimerButton
              disabled={!isRunning} // 멈춰있으면 비활성화
              variant="pause"
              onClick={handlePauseTimer}
            />
            <TimerButton
              disabled={isRunning} // 실행중 비활성화
              variant="start"
              onClick={handleResumeTimer}
            />
            <TimerButton
              variant="restart"
              onClick={handleRestartTimer} // 언제든 누를 수 있음
            />
          </>
        )}
      </div>

      {isAlertOpen && (
        <Modal
          content={alertMessage}
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
            setAlertMessage("");
          }}
        />
      )}

      {/* 토큰 만료시 비밀번호 모달 */}
      <PasswordConfirmModal
        isOpen={isPasswordModalOpen}
        logId={logId}
        title={logData.name}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={async () => {
          setIsPasswordModalOpen(false);
          // 실패했던 집중 종료 API 다시 호출
          await handleFinishFocus();
        }}
      />
    </div>
  );
}

export default Timer;

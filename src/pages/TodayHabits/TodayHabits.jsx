import { useState } from "react";

import { useTodayHabitsPag } from "../../hooks/useTodayHabits.js";
import { nowTime } from "../../utils/formatDateTime.js";

import Modal from "../../components/common/Modal.jsx";
import TodayHabitsModal from "../../components/habitModal/TodayHabitsModal.jsx";

import styles from "./TodayHabits.module.css";

function TodayHabits() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // null이면 모달 안 뜸

  const logName = "Maple"; // 로그상세 받는 이름
  const logId = 10; // 로그상세 받는 아이디값

  const {
    habits,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage,
    toggleCheck,
    loadMore,
    refresh,
  } = useTodayHabitsPag(logId);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.habitContent}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{logName}</h1>
          <div className={styles.nav}>
            <button className={styles.navButton}>오늘의 집중 &gt;</button>
            <button className={styles.navButton}>홈 &gt;</button>
          </div>
        </div>

        <div className={styles.timeBox}>
          <div className={styles.timeLabel}>현재 시간</div>
          <div className={styles.timeValue}>{nowTime()}</div>
        </div>

        <div className={styles.habitCard}>
          <div className={styles.habitCardHeader}>
            <span className={styles.habitCardTitle}>오늘의 습관</span>
            <button
              className={styles.editButton}
              onClick={() => {
                setSelectedId(logId);
                setIsEditOpen(true);
              }}
            >
              목록 수정{" "}
            </button>
          </div>

          <div className={styles.habitList}>
            {habits.map((habit) => (
              <button
                key={habit.id}
                className={`${styles.habitButton} ${habit.isChecked ? styles.habitButtonDone : styles.habitButtonTodo}`}
                onClick={async () => {
                  try {
                    await toggleCheck(habit.id);
                  } catch (err) {
                    console.log(`Error - ${err}`);
                    setAlertMessage("저장에 실패했습니다. 다시 시도해주세요");
                  }
                }}
              >
                {habit.name}
              </button>
            ))}
            {hasNextPage && (
              <button
                disabled={isLoadingMore}
                className={styles.habitButton}
                onClick={async () => {
                  await loadMore();
                }}
              >
                {isLoadingMore ? "조회중..." : "더보기"}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* 모달 창이 닫힐떄 재조회 -> 수정완료 성공시 바꿀예정 */}
      {isEditOpen && (
        <TodayHabitsModal
          id={selectedId}
          onClose={async () => {
            refresh();
            setIsEditOpen(false);
          }}
        />
      )}
      <Modal
        content={alertMessage}
        isOpen={!!alertMessage}
        type="alert"
        onClose={() => setAlertMessage(null)}
      />
    </div>
  );
}

export default TodayHabits;

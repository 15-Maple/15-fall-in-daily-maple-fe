import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useTodayHabitList } from "../hooks/useTodayHabitList.js";

import Modal from "../components/common/Modal.jsx";
import TodayHabitsModal from "../components/habitModal/TodayHabitsModal.jsx";

import styles from "./TodayHabits.module.css";

function TodayHabits() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // null이면 모달 안 뜸

  // 로그 데이터(Loglayout에서 받아옴)
  const { logData } = useOutletContext();

  const logId = logData.id; // 로그상세 받는 아이디값

  const {
    habits,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage,
    toggleCheck,
    loadMore,
    refresh,
  } = useTodayHabitList(logId);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  return (
    <>
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
        {habits.length === 0 ? (
          <div className={styles.emptyHabitBox}>
            <p className={styles.emptyHabitText}>
              아직 습관이 없어요
              <br />
              목록 수정을 눌러 습관을 생성해보세요
            </p>
          </div>
        ) : (
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
        )}
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
    </>
  );
}

export default TodayHabits;

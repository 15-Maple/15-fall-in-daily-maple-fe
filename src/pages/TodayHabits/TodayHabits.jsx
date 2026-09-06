import { useState } from "react";

import { createHabitCheck, deleteHabitCheck } from "../../api/habit/habit.js";
import { useTodayHabits } from "../../hooks/useTodayHabits.js";
import { nowTime } from "../../utils/formatDateTime.js";

import TodayHabitsModal from "../../components/habitModal/TodayHabitsModal.jsx";

import styles from "./TodayHabits.module.css";

function TodayHabits() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const logName = "Maple"; // 로그상세 받는 이름
  const logId = 1; // 로그상세 받는 아이디값

  const { habits, setHabits, isLoading, error } = useTodayHabits(logId);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  const handleCheck = async (habitId, wasChecked) => {
    //1. 화면
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, isChecked: !h.isChecked } : h,
      ),
    );
    try {
      // 상태에 따라 생성/삭제 분기
      if (wasChecked) {
        await deleteHabitCheck(habitId);
      } else {
        await createHabitCheck(habitId);
      }
    } catch (err) {
      console.error("습관 체크 저장 실패:", err);
      //3. 실패하면 롤백 + 알림
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isChecked: !h.isChecked } : h,
        ),
      );
      alert("저장에 실패했습니다. 다시 시도해주세요");
    }
  };

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
                onClick={() => handleCheck(habit.id, habit.isChecked)}
              >
                {habit.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isEditOpen && (
        <TodayHabitsModal
          id={selectedId}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}

export default TodayHabits;

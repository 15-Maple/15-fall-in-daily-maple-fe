import { useState } from "react"; // 새 습관 입력 상태 관리

import { deactivateHabit } from "../../api/habit/habit.js";
import { useTodayHabits } from "../../hooks/useTodayHabits.js";

import Button from "../ui/Button.jsx";

import trashcanIcon from "../../assets/ic-trashcan.svg";

import styles from "./TodayHabitsModal.module.css";

function HabitsModal({ id, onClose }) {
  const { habits, setHabits, isLoading, error } = useTodayHabits(id);

  const [isAdding, setIsAdding] = useState(false); // 새 습관 입력창 표시 여부
  const [newHabitName, setNewHabitName] = useState(""); // 새 습관 이름 저장

  const handleDelete = async (habitId) => {
    try {
      await deactivateHabit(habitId);

      setHabits(habits.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("습관 삭제 실패:", error);
    }
  };

  if (isLoading) return <p>불러오는 중...</p>;

  if (error) {
    return <p>에러가 발생했습니다: {error.message}</p>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>습관 목록</h1>
        <div className={styles.habitList}>
          {habits.map((habit, index) => (
            <div key={index} className={styles.habitItem}>
              <div className={styles.habitName}>{habit.name}</div>

              <button
                aria-label={`${habit.name} 삭제`}
                className={styles.habitDelete}
                onClick={() => handleDelete(habit.id)}
              >
                <img
                  alt=""
                  src={trashcanIcon}
                  className={styles.habitDeleteIcon}
                />
              </button>
            </div>
          ))}
        </div>

        {isAdding && ( // + 버튼을 누른 뒤에만 새 습관 입력창 표시
          <div className={styles.habitAddLayout}>
            <input
              placeholder="새로운 습관을 입력해주세요"
              type="text"
              value={newHabitName}
              className={styles.habitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />
            <div className={styles.habitAddSpacer} />
          </div>
        )}
        <div className={styles.habitAddLayout}>
          <button
            className={styles.habitAdd}
            onClick={() => setIsAdding(true)} // + 클릭 시 입력창 표시
          >
            +
          </button>
          <div className={styles.habitAddSpacer} />
        </div>
        <div className={styles.btnLayout}>
          <Button size="sm" className={styles.cancelButton} onClick={onClose}>
            취소
          </Button>

          <Button size="sm">수정 완료</Button>
        </div>
      </div>
    </div>
  );
}

export default HabitsModal;

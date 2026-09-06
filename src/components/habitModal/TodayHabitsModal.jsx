import { useEffect, useState } from "react";

import { deactivateHabit, fetchTodayHabits } from "../../api/habit.js";

import Button from "../ui/Button.jsx";

import trashcanIcon from "../../assets/ic-trashcan.svg";

import styles from "./TodayHabitsModal.module.css";

function HabitsModal({ onClose }) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const logId = 3; //테스트용

  useEffect(() => {
    fetchTodayHabits(logId)
      .then((data) => {
        console.log("습관 API 데이터:", data);
        setHabits(data);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

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
          {habits.map((habit) => (
            <div key={habit.id} className={styles.habitItem}>
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

        <div className={styles.habitAddLayout}>
          <button className={styles.habitAdd}>+</button>
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

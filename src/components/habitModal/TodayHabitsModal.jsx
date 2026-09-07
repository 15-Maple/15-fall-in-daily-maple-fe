import { useTodayHabits } from "../../hooks/useTodayHabits.js";

import Button from "../ui/Button.jsx";

import trashcanIcon from "../../assets/ic-trashcan.svg";

import styles from "./TodayHabitsModal.module.css";

function HabitsModal({ id, onClose }) {
  const { habits, setHabits, isLoading, error } = useTodayHabits(id);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  const handleDelete = (indexToDelete) => {
    setHabits(habits.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>습관 목록</h1>

        <div className={styles.habitList}>
          {habits.map((habit, index = habit.id) => (
            <div key={index} className={styles.habitItem}>
              <div className={styles.habitName}>{habit.name}</div>

              <button
                aria-label={`${habit} 삭제`}
                className={styles.habitDelete}
                onClick={() => handleDelete(index)}
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

import { useState, useEffect } from "react";

import { getTodayHabits } from "../../api/habit/habit.js";

import Button from "../ui/Button.jsx";

import trashcanIcon from "../../assets/ic-trashcan.svg";

import styles from "./TodayHabitsModal.module.css";

function HabitsModal({ onClose }) {
  // const [habits, setHabits] = useState([
  //   "미라클모닝 6시 기상",
  //   "아침 챙겨 먹기",
  //   "React 스터디 책 1챕터 읽기",
  //   "스트레칭",
  //   "영양제 챙겨 먹기",
  //   "사이드 프로젝트",
  //   "물 2L 먹기",
  // ]);

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const logId = 1; // 로그상세 받는 아이디값

  useEffect(() => {
    getTodayHabits(logId)
      .then(setHabits)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

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

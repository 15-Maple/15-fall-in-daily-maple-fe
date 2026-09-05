import { useEffect, useState } from "react";

import {
  getTodayHabits,
  createHabitCheck,
  deleteHabitCheck,
} from "../../api/habit/habit.js";

import TodayHabitsModal from "../../components/habitModal/TodayHabitsModal.jsx";

import styles from "./TodayHabits.module.css";

// mokdata habits
// const habits = [
//   {id: 1, isChecked: true, name: '미라클모닝 6시 기상'},
//   {id: 2, isChecked: true, name: '아침 챙겨 먹기'},
//   {id: 3, isChecked: false, name: 'React 스터디 책 1쳅터 읽기'},
//   {id: 4, isChecked: false, name: '스트레칭'},
//   {id: 5, isChecked: false, name: '영양제 챙겨먹기'},
//   {id: 6, isChecked: false, name: '사이드 프로젝트'},
//   {id: 7, isChecked: false, name: '물 2L 먹기'},
// ];

//현재 시간
const nowTime = () => {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const time = now.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${yyyy}-${mm}-${dd} ${time}`;
};

function TodayHabits() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  //habits=[], isLoading=true, error=null 상태일떄 그대로 한번만 실행
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const logName = "Maple"; // 로그상세 받는 이름
  const logId = 1; // 로그상세 받는 아이디값

  useEffect(() => {
    getTodayHabits(logId)
      .then(setHabits)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

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
              onClick={() => setIsEditOpen(true)}
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

      {isEditOpen && <TodayHabitsModal onClose={() => setIsEditOpen(false)} />}
    </div>
  );
}

export default TodayHabits;

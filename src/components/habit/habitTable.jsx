import dotori_0 from "../../assets/dotori_0.svg";
import dotori_1 from "../../assets/dotori_1.svg";

import styles from "./Habit.module.css";

function HabitTable() {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const habits = [
    {
      name: "도토리 100개 줍기",
      records: [true, true, true, true, true, true, false],
    },
    {
      name: "다람쥐 친구 구하기",
      records: [true, true, true, true, true, true, false],
    },
    {
      name: "스쿼시 하기",
      records: [true, true, true, true, true, true, false],
    },
    {
      name: "React 스터디 책 1챕터 읽기",
      records: [false, false, false, false, false, false, false],
    },
    {
      name: "오버워치 하기",
      records: [false, false, false, false, false, false, false],
    },
    {
      name: "고양이 놀아주기",
      records: [false, false, false, false, false, false, false],
    },
  ];

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>습관 기록표</h2>

      <div className={styles.habitBox}>
        {/* 요일 */}
        <div className={styles.row}>
          <div className={styles.name}></div>
          {days.map((day) => (
            <span key={day} className={styles.week}>
              {day}
            </span>
          ))}
        </div>

        {habits.map((habit, index) => (
          <div
            key={index}
            className={`${styles.habit} ${habit.isDeleted ? styles.disabled : ""}`}
          >
            <span className={styles.habitTitle}>{habit.name}</span>

            {habit.records.map((record, index) => (
              <span key={index}>
                <img src={record ? dotori_1 : dotori_0} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitTable;

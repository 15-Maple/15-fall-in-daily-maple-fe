import { useState, useEffect } from "react";

import { getHabitsWeekly } from "../../api/habit/habit";

import dotori_0 from "../../assets/dotori_0.svg";
import dotori_1 from "../../assets/dotori_1.svg";

import styles from "./habit.module.css";

function HabitTable({ logId }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [habitWeekly, setHabitWeekly] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { weekStart, weekEnd, items } = await getHabitsWeekly(logId);
        setHabitWeekly(items);
        console.log(`주간기록표 ${weekStart} / ${weekEnd}`);
      } catch (error) {
        console.log(`주간기록표 에러 ${error}`);
      } finally {
        console.log("주간기록표 조회 완료");
      }
    })();
  }, [logId]);

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

        {habitWeekly.map((habit) => (
          <div
            key={habit.habitId}
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

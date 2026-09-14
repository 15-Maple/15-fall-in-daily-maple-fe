import { useState, useEffect } from "react";

import { getHabitsWeekly } from "../../api/habit.js";

import AcornSticker from "../common/AcornSticker.jsx";
import Nohabit from "./noHabit";

import styles from "./habit.module.css";

function HabitTable({ logId }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  //백엔드 주간 습관데이터
  const [habitWeekly, setHabitWeekly] = useState([]);

  // 주간습관기록 조회
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

  //습관이 없으면 nohabit
  if (habitWeekly.length === 0) {
    return <Nohabit />;
  }

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>습관 기록표</h2>

      <div className={styles.habitScroll}>
        <div className={styles.habitContent}>
          {/* 요일영역 */}
          <div className={styles.habitBox}>
            <div className={styles.row}>
              <div className={styles.name}></div>
              {/* 월~일 표시 */}
              {days.map((day) => (
                <span key={day} className={styles.week}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* 습관목록 */}
          {habitWeekly.map((habit) => (
            <div
              key={habit.habitId}
              className={`${styles.habit} ${habit.isDeleted ? styles.disabled : ""}`}
            >
              <span className={styles.habitTitle}>{habit.name}</span>
              {/* 월~일 습관 기록표시 */}
              {habit.records.map((record, index) => (
                <span key={index}>
                  <AcornSticker
                    bgColor={
                      record ? "var(--color-sticker-yellow-200)" : "#eeeeee"
                    }
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitTable;

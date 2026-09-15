import { useState, useEffect } from "react";

import { getHabitsWeekly } from "../../api/habit.js";

import AcornSticker from "../common/AcornSticker.jsx";
import Nohabit from "./noHabit";

import styles from "./habit.module.css";

const STICKER_COLORS = [
  // 밝고 산뜻한 파스텔톤 위주
  "var(--color-sticker-light-green-100)",
  "var(--color-sticker-yellow-200)",
  "var(--color-sticker-pink-100)",
  "var(--color-sticker-blue-100)",
  "var(--color-sticker-purple-200)",
  "var(--color-sticker-light-mint-100)",

  // 조금 더 선명한 색상들
  "var(--color-sticker-yellow-300)",
  "var(--color-sticker-light-green-200)",
  "var(--color-sticker-pink-300)",
  "var(--color-sticker-blue-200)",
  "var(--color-sticker-purple-100)",
  "var(--color-sticker-light-mint-200)",

  // 남은 색상들 교차 배치 (진한 색상과 밝은 색상 대비)
  "var(--color-sticker-yellow-100)",
  "var(--color-sticker-pink-200)",
  "var(--color-sticker-light-green-300)",
  "var(--color-sticker-blue-300)",
  "var(--color-sticker-purple-300)",
  "var(--color-sticker-green)",
];

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
          {habitWeekly.map((habit, habitIndex) => {
            const currentColor =
              STICKER_COLORS[habitIndex % STICKER_COLORS.length];
            return (
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
                        record ? currentColor : "var(--color-sticker-empty)"
                      }
                    />
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HabitTable;

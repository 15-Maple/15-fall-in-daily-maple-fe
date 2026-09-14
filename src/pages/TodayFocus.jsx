import Timer from "../components/focus/Timer";

import styles from "./TodayFocus.module.css";

function TodayFocus() {
  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.contentTitle}>오늘의 집중</h2>
      <div className={styles.timerWrapper}>
        <Timer />
      </div>
    </div>
  );
}
export default TodayFocus;

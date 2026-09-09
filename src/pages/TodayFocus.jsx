import Timer from "../components/focus/Timer";
import LogLayout from "../components/layout/LogLayout";
import PointHistory from "../components/point/PointHistory";

import styles from "./TodayFocus.module.css";

function TodayFocus() {
  const info = (
    <div className={styles.pointContainer}>
      <span>현재까지 획득한 포인트</span>
      <PointHistory />
    </div>
  );
  return (
    <LogLayout info={info} title="maple의 로그">
      {/* 컨텐츠 영역을 LogLayout의 children prop으로 보냄 */}
      <div className={styles.contentWrapper}>
        <h2 className={styles.contentTitle}>오늘의 집중</h2>
        <div className={styles.timerWrapper}>
          <Timer />
        </div>
      </div>
    </LogLayout>
  );
}
export default TodayFocus;

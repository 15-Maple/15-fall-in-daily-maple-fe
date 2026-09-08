import PointHistory from "../components/point/PointHistory";
import Reaction from "../components/reaction/Reaction";

import arrow from "../assets/ic-arrow-right.svg";

import styles from "./LogDetail.module.css";

function LogDetail() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.topArea}>
          <div className={styles.leftArea}>
            <Reaction />

            <h1 className={styles.title}>연우의 개발공장</h1>

            <div className={styles.sub}>
              <p className={styles.label}>소개</p>

              <p className={styles.desc}>
                Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅! :)
              </p>
            </div>

            <div className={styles.pointText}>현재까지 획득한 포인트</div>

            <PointHistory />
          </div>

          <div className={styles.rightArea}>
            <div className={styles.menu}>
              <button className={styles.share}>공유하기</button>
              <span className={styles.barOne}>|</span>
              <button>수정하기</button>
              <span className={styles.barTwo}>|</span>
              <button className={styles.deleteBtn}>스터디 삭제하기</button>
            </div>

            <div className={styles.habitMenu}>
              <button className={styles.todayHabit}>
                오늘의 습관
                <img src={arrow} />
              </button>
              <button className={styles.todayFocus}>
                오늘의 집중
                <img src={arrow} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h2>습관기록표</h2>

          <p className={styles.noHabitText}>
            아직 습관이 없어요
            <br />
            오늘의 습관에서 습관을 생성해보세요
          </p>
        </div>
      </section>
    </main>
  );
}

export default LogDetail;

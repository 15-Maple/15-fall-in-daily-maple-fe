import Reaction from "../components/reaction/Reaction";

import styles from "./StudyDetail.module.css";

function StudyDetail() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <Reaction />
        <h1>경래의 개발공장</h1>
        <div>
          <p>소개</p>
          <p>Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅! :)</p>
        </div>
        <div>현재까지 획득한 포인트</div>
        <div>
          <h2>습관기록표</h2>
          <p>
            아직 습관이 없어요
            <br /> 오늘의 습관에서 습관을 생성해보세요
          </p>
        </div>
      </section>
    </main>
  );
}

export default StudyDetail;

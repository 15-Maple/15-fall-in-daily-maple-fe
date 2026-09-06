import styles from "../../pages/Home.module.css";

function RecentStudies() {
  return (
    <section className={styles.recentLogs}>
      <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>

      <div className={styles.recentLogsList}>
        <p className={styles.emptyMessage}>아직 조회한 스터디가 없어요</p>
      </div>
    </section>
  );
}

export default RecentStudies;

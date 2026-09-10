import styles from "./Habit.module.css";

function Nohabit() {
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>습관기록표</h2>

      <p className={styles.noHabitText}>
        아직 습관이 없어요
        <br />
        오늘의 습관에서 습관을 생성해보세요
      </p>
    </div>
  );
}

export default Nohabit;

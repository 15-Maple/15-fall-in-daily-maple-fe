import styles from "./habit.module.css";

function HabitTable() {
  const habits = [
    {
      name: "도토리 100개 줍기",
      dotoris: [true, true, true, true, true, true, false],
    },
    {
      name: "다람쥐 친구구하기",
      dotoris: [true, true, true, true, true, true, false],
    },
    {
      name: "스쿼시 하기",
      dotoris: [true, true, true, true, true, true, false],
    },
    {
      name: "낮잠자기",
      dotoris: [true, true, true, true, true, true, false],
    },
    {
      name: "오버워치 하기",
      dotoris: [true, true, true, true, true, true, false],
    },
    {
      name: "고양이 놀아주기",
      dotoris: [true, true, true, true, true, true, false],
    },
  ];

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>습관 기록표</h2>

      <div>
        {days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {habits.map((habit) => (
        <div key={habit.name}>
          <span>{habit.name}</span>

          {habit.dotoris.map((dotori, index) => (
            <span key={index}>{dotori ? "o" : "x"}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HabitTable;

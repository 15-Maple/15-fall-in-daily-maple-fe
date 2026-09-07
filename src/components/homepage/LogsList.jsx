import { useState } from "react";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function LogsList() {
  const [sort, setSort] = useState("recent");

  const logs = [
    {
      id: 1,
      name: "이유디의 UX 스터디",
      description: "Slow And Steady Wins The Race!!",
      point: 310,
      elapsedDays: 62,
      background: "green",
      reactions: [
        { emoji: "🧑🏻‍💻", count: 37 },
        { emoji: "🔥", count: 26 },
        { emoji: "🤍", count: 14 },
      ],
    },
    {
      id: 2,
      name: "K.K. 의 UX 스터디",
      description: "나비보벳따우",
      point: 310,
      elapsedDays: 62,
      background: "green",
      reactions: [
        { emoji: "🧑🏻‍💻", count: 37 },
        { emoji: "🔥", count: 26 },
        { emoji: "🤍", count: 14 },
      ],
    },
    {
      id: 3,
      name: "연우 의 개발공장",
      description: "오늘 하루도 화이팅 :)",
      point: 50,
      elapsedDays: 10,
      background: "yellow",
      reactions: [
        { emoji: "👀", count: 12 },
        { emoji: "👍🏻", count: 11 },
        { emoji: "🤩", count: 9 },
      ],
    },
  ];

  const getSortLabel = () => {
    if (sort === "pointDesc" || sort === "pointAsc") {
      return "포인트순";
    }

    if (sort === "recent") {
      return "최근순";
    }

    if (sort === "oldest") {
      return "과거순";
    }

    return "최근순";
  };

  return (
    <section className={styles.logsList}>
      <h2 className={styles.sectionTitle}>로그 둘러보기</h2>

      <div className={styles.logsListControls}>
        <input
          placeholder="검색"
          type="text"
          className={styles.logsSearchInput}
        />

        <div className={styles.logsSortBox}>
          <span className={styles.logsSortLabel}>{getSortLabel()}</span>

          <select
            disabled={logs.length === 0}
            value={sort}
            className={styles.logsSortSelect}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">최근순</option>
            <option value="oldest">과거순</option>
            <option value="pointDesc">많은 포인트 순</option>
            <option value="pointAsc">적은 포인트 순</option>
          </select>
        </div>
      </div>

      <div className={styles.logsGrid}>
        {logs.length === 0 ? (
          <p className={styles.emptyMessage}>아직 둘러볼 로그가 없어요</p>
        ) : (
          logs.map((log) => (
            <LogCard
              key={log.id}
              name={log.name}
              background={log.background}
              description={log.description}
              elapsedDays={log.elapsedDays}
              emojiCount={log.emojiCount}
              point={log.point}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default LogsList;

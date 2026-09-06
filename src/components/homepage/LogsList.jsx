import { useState } from "react";
// import LogsCard from "./LogsCard";

import styles from "../../pages/Home.module.css";

function LogsList() {
  const [sort, setSort] = useState("recent");

  const studies = [];

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
      <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

      <div className={styles.logsListControls}>
        <input
          placeholder="검색"
          type="text"
          className={styles.logsSearchInput}
        />

        <div className={styles.logsSortBox}>
          <span className={styles.logsSortLabel}>{getSortLabel()}</span>

          <select
            disabled={studies.length === 0}
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
        <p className={styles.emptyMessage}>아직 둘러볼 스터디가 없어요</p>
      </div>
    </section>
  );
}

export default LogsList;

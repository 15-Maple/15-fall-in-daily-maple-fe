import { useEffect, useRef, useState } from "react";

import { getHomeLogs } from "../../api/home/logs";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function LogsList() {
  const [sort, setSort] = useState("recent");
  const [logs, setLogs] = useState([]);

  // 최초 6개만 배치
  const [visibleCount, setVisibleCount] = useState(6);

  // 새로 열린 카드 위치를 배치
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getHomeLogs();

        setLogs(data);
      } catch (error) {
        console.error("로그 목록 조회 실패:", error);
      }
    };

    fetchLogs();
  }, []);

  const sortedLogs = [...logs].sort((a, b) => {
    if (sort === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sort === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sort === "pointDesc") {
      return b.point - a.point;
    }

    if (sort === "pointAsc") {
      return a.point - b.point;
    }

    return 0;
  });

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

  // 더보기
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);

    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
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
        {sortedLogs.length === 0 ? (
          <p className={styles.emptyMessage}>아직 둘러볼 로그가 없어요</p>
        ) : (
          sortedLogs.slice(0, visibleCount).map((log, index) => (
            <div
              key={log.id}
              ref={index === visibleCount - 6 ? loadMoreRef : null}
            >
              <LogCard
                name={log.name}
                background={log.background}
                description={log.description}
                elapsedDays={log.elapsedDays}
                point={log.point}
                reactions={log.reactions}
              />
            </div>
          ))
        )}
      </div>

      {visibleCount < sortedLogs.length && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default LogsList;

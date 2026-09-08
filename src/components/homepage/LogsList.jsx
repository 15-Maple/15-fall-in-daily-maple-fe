// src/components/homepage/LogsList.jsx

import { useEffect, useRef, useState } from "react";

import { getHomeLogs } from "../../api/home/logs.js";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function LogsList() {
  // 현재 선택된 정렬 방식
  const [sort, setSort] = useState("recent");

  // 백엔드에서 받아온 로그 목록
  const [logs, setLogs] = useState([]);

  // 검색어
  const [keyword, setKeyword] = useState("");

  // 처음에는 6개만 표시
  const [visibleCount, setVisibleCount] = useState(6);

  // 더보기 위치로 스크롤하기 위한 ref
  const loadMoreRef = useRef(null);

  // 로그 목록 API 호출
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

  // 검색
  const filteredLogs = logs.filter((log) => {
    const searchKeyword = keyword.trim().toLowerCase();

    // 검색어가 없으면 모든 로그 표시
    if (!searchKeyword) {
      return true;
    }

    const name = String(log.name ?? "").toLowerCase();
    const description = String(log.description ?? "").toLowerCase();

    return name.includes(searchKeyword) || description.includes(searchKeyword);
  });

  // 검색 결과를 기준으로 정렬
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    // 최근순
    if (sort === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // 과거순
    if (sort === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    // 많은 포인트 순
    if (sort === "pointDesc") {
      return b.point - a.point;
    }

    // 적은 포인트 순
    if (sort === "pointAsc") {
      return a.point - b.point;
    }

    return 0;
  });

  // 현재 화면에 보여줄 로그
  const visibleLogs = sortedLogs.slice(0, visibleCount);

  // 정렬 선택창에 표시할 라벨
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

  // 더보기 클릭
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);

    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
  };

  return (
    <section className={styles.logsList}>
      {/* 제목 */}
      <h2 className={styles.sectionTitle}>로그 둘러보기</h2>

      {/* 검색 + 정렬 */}
      <div className={styles.logsListControls}>
        <input
          placeholder="검색"
          type="text"
          value={keyword}
          className={styles.logsSearchInput}
          onChange={(e) => {
            setKeyword(e.target.value);

            // 검색어가 바뀌면 다시 처음 6개부터 표시
            setVisibleCount(6);
          }}
        />

        <div className={styles.logsSortBox}>
          <span className={styles.logsSortLabel}>{getSortLabel()}</span>

          <select
            disabled={logs.length === 0}
            value={sort}
            className={styles.logsSortSelect}
            onChange={(e) => {
              setSort(e.target.value);

              // 정렬 방식 변경 시 다시 처음 6개부터 표시
              setVisibleCount(6);
            }}
          >
            <option value="recent">최근순</option>

            <option value="oldest">과거순</option>

            <option value="pointDesc">많은 포인트 순</option>

            <option value="pointAsc">적은 포인트 순</option>
          </select>
        </div>
      </div>

      {/* 로그 카드 */}
      <div className={styles.logsGrid}>
        {visibleLogs.length === 0 ? (
          <p className={styles.emptyMessage}>
            {keyword ? "검색 결과가 없어요" : "아직 둘러볼 로그가 없어요"}
          </p>
        ) : (
          visibleLogs.map((log) => (
            <LogCard
              key={log.id}
              name={log.name}
              background={log.background}
              description={log.description}
              elapsedDays={log.elapsedDays}
              point={log.point}
              reactions={log.reactions}
            />
          ))
        )}
      </div>

      {/* 더보기 */}
      {visibleCount < sortedLogs.length && (
        <div ref={loadMoreRef} className={styles.loadMoreWrapper}>
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

// src/components/homepage/LogsList.jsx

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getHomeLogs } from "../../api/home/logs.js";
import { saveRecentLog } from "../../utils/recentLogs.js";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function LogsList() {
  // 현재 선택된 정렬 방식
  const [sort, setSort] = useState("recent");

  // 백엔드에서 받아온 로그 목록
  const [logs, setLogs] = useState([]);

  // 검색어
  const [keyword, setKeyword] = useState("");

  // 처음에는 6개까지만 표시
  const [visibleCount, setVisibleCount] = useState(6);

  // 정렬 드롭다운 열림/닫힘
  const [isSortOpen, setIsSortOpen] = useState(false);

  // 더보기 위치로 스크롤하기 위한 ref
  const loadMoreRef = useRef(null);

  // 카드 클릭 시 상세페이지 이동
  const navigate = useNavigate();

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

    if (!searchKeyword) {
      return true;
    }

    const name = String(log.name ?? "").toLowerCase();
    const description = String(log.description ?? "").toLowerCase();

    return name.includes(searchKeyword) || description.includes(searchKeyword);
  });

  // 검색 결과 기준 정렬
  const sortedLogs = [...filteredLogs].sort((a, b) => {
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

  // 현재 화면에 보여줄 로그
  const visibleLogs = sortedLogs.slice(0, visibleCount);

  // 현재 선택된 정렬 라벨
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

  // 정렬 선택
  const handleSortChange = (sortType) => {
    setSort(sortType);
    setVisibleCount(6);
    setIsSortOpen(false);
  };

  // 더보기
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
            setVisibleCount(6);
          }}
        />

        {/* 정렬 드롭다운 */}
        <div className={styles.logsSortBox}>
          <button
            disabled={logs.length === 0}
            type="button"
            className={styles.logsSortButton}
            onClick={() => setIsSortOpen((prev) => !prev)}
          >
            <span>{getSortLabel()}</span>

            <span
              className={`${styles.logsSortArrow} ${
                isSortOpen ? styles.logsSortArrowOpen : ""
              }`}
            >
              ▼
            </span>
          </button>

          {isSortOpen && (
            <div className={styles.logsSortDropdown}>
              <button
                type="button"
                className={sort === "recent" ? styles.logsSortOptionActive : ""}
                onClick={() => handleSortChange("recent")}
              >
                최근순
              </button>

              <button
                type="button"
                className={sort === "oldest" ? styles.logsSortOptionActive : ""}
                onClick={() => handleSortChange("oldest")}
              >
                과거순
              </button>

              <button
                type="button"
                className={
                  sort === "pointDesc" ? styles.logsSortOptionActive : ""
                }
                onClick={() => handleSortChange("pointDesc")}
              >
                많은 포인트 순
              </button>

              <button
                type="button"
                className={
                  sort === "pointAsc" ? styles.logsSortOptionActive : ""
                }
                onClick={() => handleSortChange("pointAsc")}
              >
                적은 포인트 순
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 로그 카드 목록 */}
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
              onClick={() => {
                saveRecentLog(log);
                navigate(`/logdetail/${log.id}`);
              }}
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

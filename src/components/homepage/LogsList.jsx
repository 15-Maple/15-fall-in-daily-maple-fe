import { useState } from "react";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function LogsList() {
  // 현재 선택된 정렬 방식을 저장
  const [sort, setSort] = useState("recent");

  // 목업데이터
  const mockLogs = [
    {
      id: 1,
      name: "React 공부",
      description: "매일 React 공부하기",
      point: 120,
      elapsedDays: 7,

      // 로그 생성 날짜
      // 최근순 / 과거순 정렬에 사용
      createdAt: "2026-09-07",

      // LogCard 내부의 BACKGROUND_MAP에서
      // "blue"에 해당하는 bg_blue.svg를 찾아 배경으로 사용
      background: "blue",

      // 로그의 이모지 반응 목록
      reactions: [
        {
          emoji: "👍",
          count: 3,
        },
        {
          emoji: "🔥",
          count: 2,
        },
      ],
    },

    {
      id: 2,
      name: "JavaScript 공부",
      description: "기초 문법 다시 복습하기",
      point: 90,
      elapsedDays: 5,

      // 로그 생성 날짜
      createdAt: "2026-09-02",

      // "desk" 값을 LogCard가 받아
      // bg_img_desk.svg 이미지와 연결
      background: "desk",

      reactions: [
        {
          emoji: "👏",
          count: 4,
        },
      ],
    },

    {
      id: 3,
      name: "JSX 공부",
      description: "매일 JSX 공부하기",
      point: 120,
      elapsedDays: 9,

      // 로그 생성 날짜
      createdAt: "2026-09-05",

      background: "blue",

      reactions: [
        {
          emoji: "👍",
          count: 3,
        },
        {
          emoji: "🔥",
          count: 2,
        },
      ],
    },

    {
      id: 4,
      name: "UX 공부",
      description: "UX 공부하기",
      point: 130,
      elapsedDays: 10,

      // 로그 생성 날짜
      createdAt: "2026-08-30",

      background: "blue",

      reactions: [
        {
          emoji: "👍",
          count: 3,
        },
        {
          emoji: "🔥",
          count: 2,
        },
      ],
    },
  ];

  // 현재 선택한 정렬 방식에 맞게
  // mockLogs의 순서를 새로 정렬한 배열
  //
  // [...mockLogs]를 사용하는 이유:
  // 원본 mockLogs 배열을 직접 변경하지 않기 위해서
  const sortedLogs = [...mockLogs].sort((a, b) => {
    // 최근순
    // 날짜가 최신인 로그가 먼저 나오도록 정렬
    if (sort === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // 과거순
    // 날짜가 오래된 로그가 먼저 나오도록 정렬
    if (sort === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    // 많은 포인트 순
    // point가 높은 로그가 먼저 나오도록 정렬
    if (sort === "pointDesc") {
      return b.point - a.point;
    }

    // 적은 포인트 순
    // point가 낮은 로그가 먼저 나오도록 정렬
    if (sort === "pointAsc") {
      return a.point - b.point;
    }

    return 0;
  });

  // 화면에 보여줄 정렬 이름 결정
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
      {/* 로그 목록 영역 제목 */}
      <h2 className={styles.sectionTitle}>로그 둘러보기</h2>

      {/* 검색창 + 정렬 선택 영역 */}
      <div className={styles.logsListControls}>
        {/* 로그 검색 입력창 */}
        <input
          placeholder="검색"
          type="text"
          className={styles.logsSearchInput}
        />

        {/* 정렬 선택 영역 */}
        <div className={styles.logsSortBox}>
          {/* 현재 선택된 정렬 기준을 화면에 표시 */}
          <span className={styles.logsSortLabel}>{getSortLabel()}</span>

          <select
            // 로그 데이터가 하나도 없을 때 정렬 기능 비활성화
            disabled={mockLogs.length === 0}
            value={sort}
            className={styles.logsSortSelect}

            // 정렬 옵션 선택 시 sort 상태 변경
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">최근순</option>
            <option value="oldest">과거순</option>
            <option value="pointDesc">많은 포인트 순</option>
            <option value="pointAsc">적은 포인트 순</option>
          </select>
        </div>
      </div>

      {/* 로그 카드 표시 영역 */}
      <div className={styles.logsGrid}>
        {sortedLogs.length === 0 ? (
          <p className={styles.emptyMessage}>아직 둘러볼 로그가 없어요</p>
        ) : (
          // 정렬이 완료된 sortedLogs를 사용
          sortedLogs.map((log) => (
            <LogCard
              key={log.id}

              // 로그 제목
              name={log.name}

              // 배경 종류
              background={log.background}

              // 로그 설명
              description={log.description}

              // 진행 일수
              elapsedDays={log.elapsedDays}

              // 획득 포인트
              point={log.point}

              // 이모지 반응 목록
              reactions={log.reactions}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default LogsList;

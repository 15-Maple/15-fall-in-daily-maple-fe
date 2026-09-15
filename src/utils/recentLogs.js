const RECENT_LOGS_KEY = "recentLogs";

// 최근 조회 로그 저장
export const saveRecentLog = (log) => {
  const saved = JSON.parse(localStorage.getItem(RECENT_LOGS_KEY) || "[]");

  // 예전에 객체 전체를 저장했던 데이터가 있어도 id만 추출
  const savedIds = saved.map((item) =>
    typeof item === "object" ? item.id : item,
  );

  // 이미 조회한 로그라면 기존 위치에서 제거
  const filteredIds = savedIds.filter((id) => id !== log.id);

  // 가장 최근 조회한 로그를 맨 앞으로
  // 최대 3개까지만 저장
  const updatedIds = [log.id, ...filteredIds].slice(0, 3);

  localStorage.setItem(RECENT_LOGS_KEY, JSON.stringify(updatedIds));
};

// 최근 조회 로그 id 가져오기
export const getRecentLogIds = () => {
  const saved = JSON.parse(localStorage.getItem(RECENT_LOGS_KEY) || "[]");

  return saved
    .map((item) => (typeof item === "object" ? item.id : item))
    .filter(Boolean);
};

// 최근 조회 로그에서 특정 로그 제거
export const removeRecentLog = (logId) => {
  const saved = JSON.parse(localStorage.getItem(RECENT_LOGS_KEY) || "[]");

  const filtered = saved.filter((item) => {
    const id = typeof item === "object" ? item.id : item;

    return Number(id) !== Number(logId);
  });

  localStorage.setItem(RECENT_LOGS_KEY, JSON.stringify(filtered));
};

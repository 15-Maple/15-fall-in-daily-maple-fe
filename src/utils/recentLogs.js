const RECENT_LOGS_KEY = "recentLogs";

export const saveRecentLog = (log) => {
  const savedLogs = JSON.parse(localStorage.getItem(RECENT_LOGS_KEY) || "[]");

  // 같은 로그가 이미 있으면 기존 위치에서 제거
  const filteredLogs = savedLogs.filter((savedLog) => savedLog.id !== log.id);

  // 가장 최근에 본 로그를 맨 앞에 추가
  const updatedLogs = [log, ...filteredLogs].slice(0, 3);

  localStorage.setItem(RECENT_LOGS_KEY, JSON.stringify(updatedLogs));
};

export const getRecentLogs = () => {
  return JSON.parse(localStorage.getItem(RECENT_LOGS_KEY) || "[]");
};

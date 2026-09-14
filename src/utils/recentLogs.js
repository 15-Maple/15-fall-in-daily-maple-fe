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

// 로그 삭제하면 최근 조회한 로그에서 제거
export function removeRecentLog(logId) {
  const recentLogs = getRecentLogs();

  const filteredLogs = recentLogs.filter(
    (log) => String(log.id) !== String(logId),
  );

  localStorage.setItem("recentLogs", JSON.stringify(filteredLogs));
}

// 잘못된 로그 제외하기
export const getValidRecentLogs = () => {
  const recentLogs = getRecentLogs();

  return recentLogs.filter(
    // 로그 id가 정수인지 확인해서 정상 로그만 남기기
    (log) => log?.id && Number.isInteger(Number(log.id)) && Number(log.id) > 0,
  );
};

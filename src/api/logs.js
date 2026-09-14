import { api } from "./axios.js";

// 로그 생성하기
export function createLog(logData) {
  return api.post("/logs", logData);
}

// 로그 전체 불러오기
export function getLogs() {
  return api.get("/logs");
}

// 로그 하나 불러오기
export function getLogById(logId) {
  if (!logId || !Number.isInteger(Number(logId))) {
    return Promise.reject(new Error("유효하지 않은 logId 입니다."));
  }
  return api.get(`/logs/${logId}`);
}

// 로그 수정하기
export function updateLog(logId, logData) {
  return api.patch(`/logs/${logId}`, logData);
}

// 로그 삭제하기
export function deleteLog(logId) {
  return api.delete(`/logs/${logId}`);
}

// export function verifyLogPassword(logId, password) {
//   return api.post(`/logs/${logId}/password`, { password });
// }

export const getHomeLogs = async () => {
  const { items: logs } = await api.get("/home/logs");

  return Promise.all(
    logs.map(async (log) => {
      const reactions = await api.get(`/logs/${log.id}/reactions`);
      return {
        ...log,

        point: log.points,

        reactions: reactions ?? [],

        elapsedDays:
          Math.floor(
            (new Date() - new Date(log.createdAt)) / (1000 * 60 * 60 * 24),
          ) + 1,
      };
    }),
  );
};

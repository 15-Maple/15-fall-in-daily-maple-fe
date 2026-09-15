import { TOKEN_PREFIX } from "../constants/auth";
import { apiClient } from "./client.js";

// 로그 생성하기
export function createLog(logData) {
  return apiClient.post("/logs", logData);
}

// 로그 전체 불러오기
export function getLogs() {
  return apiClient.get("/logs");
}

// 로그 하나 불러오기
export function getLogById(logId) {
  if (!logId || !Number.isInteger(Number(logId))) {
    return Promise.reject(new Error("유효하지 않은 logId 입니다."));
  }

  return apiClient.get(`/logs/${logId}`);
}

// 로그 수정하기
export function updateLog(logId, logData) {
  const token = sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

  return apiClient.patch("/logs", logData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 로그 삭제하기
export function deleteLog(logId) {
  const token = sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

  return apiClient.delete("/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 로그 생성일 기준 진행 일수 계산
const calculateElapsedDays = (createdAt) => {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const createdDay = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate(),
  );

  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diffTime = todayDay - createdDay;

  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const getHomeLogs = async () => {
  const { items: logs } = await apiClient.get("/home/logs");

  return Promise.all(
    logs.map(async (log) => {
      const reactions = await apiClient.get(`/logs/${log.id}/reactions`);

      return {
        ...log,
        point: log.points,
        reactions: reactions ?? [],
        elapsedDays: calculateElapsedDays(log.createdAt),
      };
    }),
  );
};

// 로그 이름 중복검사
export function nameCheck(name) {
  return apiClient.get("/logs/name-check", {
    params: {
      name: name.trim(),
    },
  });
}
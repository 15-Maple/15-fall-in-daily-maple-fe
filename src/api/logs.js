import { api } from "./axios.js";

// 로그 생성하기
export function createLog(logData) {
  return api.post("/logs", logData);
}

// 로그 불러오기
export function getLog(logId) {
  return api.get(`/logs/${logId}`);
}

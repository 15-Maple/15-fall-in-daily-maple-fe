import { api } from "./axios.js";

// 로그 생성하기
export function createLog(logData) {
  return api.post("/logs", logData);
}

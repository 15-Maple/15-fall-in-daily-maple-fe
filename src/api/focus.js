import { api } from "./axios.js";

// 집중 세션 생성
export function createFocusSession(data) {
  return api.post("/focus", data);
}

// 집중 종료
export function finishFocus(data) {
  return api.post("/focus/finish", data);
}

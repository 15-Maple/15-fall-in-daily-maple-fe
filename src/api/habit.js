import { TOKEN_PREFIX } from "../constants/auth.js";
import { api } from "./axios.js";

// 로그별로 발급받은 출입증(토큰)을 헤더에 실어 보내기 위한 헬퍼
function authHeader(logId) {
  const token = sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function getTodayHabits(logId, { page, limit }) {
  const data = await api.get("/habits/me", {
    params: { page, limit },
    ...authHeader(logId),
  });
  return { items: data.items, hasNextPage: data.pagination.hasNextPage }; //  [items : {id, name, isChecked}, ..., hasNextPage ]
}

// 주간습관기록표 조회
export async function getHabitsWeekly(logId) {
  const data = await api.get(`/habits/${logId}/weekly`); // 헤더 필요 없음
  return {
    weekStart: data.weekStart,
    weekEnd: data.weekEnd,
    items: data.habits,
  }; //  [weekStart, weekEnd, items : {habitId, name, isDeleted,records[] } ]
}

export async function createHabitCheck(habitId, logId) {
  return api.post(`/habits/${habitId}/check`, null, authHeader(logId));
}

export async function deleteHabitCheck(habitId, logId) {
  return api.delete(`/habits/${habitId}/check`, authHeader(logId));
}

// 습관 목록 일괄 저장 (생성/수정/삭제를 한 번에 전송)
export async function syncTodayHabits(
  logId,
  { create, update, delete: deleteIds },
) {
  await api.put(
    "/habits/me",
    { create, update, delete: deleteIds },
    authHeader(logId),
  );
}

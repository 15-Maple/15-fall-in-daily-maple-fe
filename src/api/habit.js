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
  const data = await api.get("/habits/me/weekly", authHeader(logId));
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

export async function deactivateHabit(habitId, logId) {
  // TODO: 백엔드 /habits/:habitId/deactivate 구현되면 실제 API 호출로 교체
  console.log(`만드는중 ${habitId} ${logId}`);
}

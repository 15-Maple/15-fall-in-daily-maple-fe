import { api } from "../axios.js";

export async function getTodayHabits(logId, { page, limit }) {
  const data = await api.get(`/logs/${logId}/habits`, {
    params: { page, limit },
  });
  return { items: data.items, hasNextPage: data.pagination.hasNextPage }; //  [items : {id, name, isChecked}, ..., hasNextPage ]
}

// 주간습관기록표 조회
export async function getHabitsWeekly(logId) {
  const data = await api.get(`/logs/${logId}/habits/weekly`);
  return {
    weekStart: data.weekStart,
    weekEnd: data.weekEnd,
    items: data.habits,
  }; //  [weekStart, weekEnd, items : {habitId, name, isDeleted,records[] } ]
}

export async function createHabitCheck(habitId) {
  return api.post(`/habits/${habitId}/check`);
}

export async function deleteHabitCheck(habitId) {
  return api.delete(`/habits/${habitId}/check`);
}

// 습관 생성
export async function createHabit(logId, name) {
  const data = await api.post(`/logs/${logId}/habits`, { name });
  return data.habit;
}

// 습관 이름 수정
export async function updateHabit(habitId, name) {
  const data = await api.patch(`/habits/${habitId}`, { name });
  return data.habit;
}

// 습관 비활성화
export async function deactivateHabit(habitId) {
  const data = await api.patch(`/habits/${habitId}/deactivate`);
  return data.habit;
}

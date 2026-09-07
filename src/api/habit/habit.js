import { api } from "../axios.js";

export async function getTodayHabits(logId) {
  const data = await api.get(`/logs/${logId}/habits`);
  return data.items; // [{id, name, isChecked}, ...]
}

export async function createHabitCheck(habitId) {
  return api.post(`/habits/${habitId}/check`);
}

export async function deleteHabitCheck(habitId) {
  return api.delete(`/habits/${habitId}/check`);
}

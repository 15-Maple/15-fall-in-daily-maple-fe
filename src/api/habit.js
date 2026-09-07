import { api } from "./axios";

export async function fetchTodayHabits(logId) {
  const data = await api.get(`/logs/${logId}/habits`);
  return data.items; // [{id, name, isChecked}, ...]
}

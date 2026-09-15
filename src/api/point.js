import { apiClient } from "./client";

export function getPoint(logId) {
  return apiClient.get(`/logs/${logId}/point`);
}

import { api } from "./axios";

export function getPoint(logId) {
  return api.get(`/logs/${logId}/point`);
}

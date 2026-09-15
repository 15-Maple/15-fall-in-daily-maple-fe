import { apiClient } from "./client.js";

export function verifyPasswordApi(logId, password) {
  return apiClient.post("/auth/verify", { logId, password });
}

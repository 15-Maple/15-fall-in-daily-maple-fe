import { api } from "./axios.js";

export function verifyPasswordApi(logId, password) {
  return api.post("/auth/verify", { logId, password });
}

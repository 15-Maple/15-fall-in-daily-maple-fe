import { apiClient } from "./client";

//리액션조회
export function getReaction(logId) {
  return apiClient.get(`/logs/${logId}/reactions`);
}

//리액션추가
export function postReaction(logId, emoji) {
  return apiClient.post(`/logs/${logId}/reactions`, { reactionType: emoji });
}

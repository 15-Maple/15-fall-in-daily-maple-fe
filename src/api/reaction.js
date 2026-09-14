import { api } from "./axios";

//리액션조회
export function getReaction(logId) {
  return api.get(`/logs/${logId}/reactions`);
}

//리액션추가
export function postReaction(logId, emoji) {
  return api.post(`/logs/${logId}/reactions`, { reactionType: emoji });
}

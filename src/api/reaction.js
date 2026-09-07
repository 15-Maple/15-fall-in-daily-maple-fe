import axios from "axios";

//리액션조회
export function getReaction(logId) {
  return axios.get(`/api/logs/${logId}/reactions`);
}

//리액션추가
export function postReaction(logId, emoji) {
  return axios.post(`/api/logs/${logId}/reactions`, { emoji });
}

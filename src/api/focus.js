import { TOKEN_PREFIX } from "../constants/auth";
import { api } from "./axios.js";

// 집중 세션 생성
export function createFocusSession({ logId, targetSeconds }) {
  const token = sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

  return api.post(
    "/focus",
    { targetSeconds },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

// 집중 종료
export function finishFocus({ logId }) {
  const token = sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

  return api.post(
    "/focus/finish",
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

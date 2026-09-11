import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

// 기존 만들어두셨던 interceptor와 합쳤습니다.(비밀번호 처리 추가)
api.interceptors.response.use(
  (res) => {
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  },
  (err) => {
    const requestUrl = err.config.url;

    // 타이머 종료는 따로 처리
    const isFocusFinishApi = requestUrl.includes("/focus/finish");

    // 401 에러(토큰 만료)이면서 타이머 API가 아닐 때 ➔ 강제 로그아웃 처리
    if (err.response?.status === 401 && !isFocusFinishApi) {
      console.warn("인증이 만료되었습니다.");

      // 모든 토큰 지움
      sessionStorage.clear();

      // 커스텀 이벤트(토큰 만료)
      window.dispatchEvent(new CustomEvent("auth-expired"));

      return Promise.reject(err);
    }

    // 그 외 일반적인 에러 처리
    const message = err.response?.data?.message ?? err.message;
    return Promise.reject(new Error(message, { cause: err }));
  },
);

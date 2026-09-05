import axios from "axios";

// PORT 5001 사용
export const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

//임시로 사용하기 위해서 만듬
api.interceptors.response.use(
  (res) => {
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  },
  (err) => {
    const message = err.response?.data?.message ?? err.message;
    return Promise.reject(new Error(message, { cause: err }));
  },
);

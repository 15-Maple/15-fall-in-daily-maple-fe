export const nowTime = () => {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const time = now.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${yyyy}-${mm}-${dd} ${time}`;
};

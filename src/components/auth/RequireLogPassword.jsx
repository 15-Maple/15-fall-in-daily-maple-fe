import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PasswordConfirmModal from "../common/PasswordConfirmModal";

function RequireLogPassword({ children }) {
  const { logId } = useParams();
  const navigate = useNavigate();

  // 토큰이 있는지 없는지
  const [hasToken, setHasToken] = useState(
    !!sessionStorage.getItem(`log_token_${logId}`),
  );

  // 토큰이 있으면 원래 가려던 페이지(children)
  if (hasToken) {
    return children;
  }

  // 토큰이 없으면 비밀번호 모달
  return (
    <PasswordConfirmModal
      isOpen={true}
      logId={logId}
      title="로그 이름" // 로그 이름 넣어야함
      onClose={() => {
        // 유저가 모달에서 비밀번호 안 치고 '나가기'나 'X'를 눌렀을 때의 처리!
        alert("비밀번호 인증이 필요합니다.");
        const hasPreviousPage =
          window.history.state && window.history.state.idx > 0;
        if (hasPreviousPage) {
          navigate(-1, { replace: true });
        } else {
          navigate(`/`, { replace: true });
        }
      }}
      onSuccess={() => {
        setHasToken(true);
      }}
    />
  );
}

export default RequireLogPassword;

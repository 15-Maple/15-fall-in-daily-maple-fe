import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

import { TOKEN_PREFIX } from "../../constants/auth";
import PasswordConfirmModal from "../common/PasswordConfirmModal";

import styles from "./RequireLogPassword.module.css";

function RequireLogPassword({ children }) {
  const { logId } = useParams();
  const navigate = useNavigate();

  // context
  const { logData } = useOutletContext();

  // 토큰이 있는지 없는지
  const [hasToken, setHasToken] = useState(
    !!sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`),
  );

  // 토큰이 있으면 원래 가려던 페이지(children)
  if (hasToken) {
    return children;
  }

  // 토큰이 없으면 비밀번호 모달
  return (
    <>
      {/* 가짜배경 */}
      <div className={styles.contentContainer}>
        🔒 접근 권한을 확인하고 있습니다.
      </div>

      {/* 비밀번호 확인 모달 */}
      <PasswordConfirmModal
        isOpen={true}
        logId={logId}
        title={logData.name}
        onClose={() => {
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
    </>
  );
}

export default RequireLogPassword;

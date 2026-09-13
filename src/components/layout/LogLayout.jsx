import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";

import { getLogById } from "../../api/logs.js";
import { nowTime } from "../../utils/formatDateTime.js";

import { TOKEN_PREFIX } from "../../constants/auth";
import { ROUTES } from "../../constants/routes";
import PasswordConfirmModal from "../common/PasswordConfirmModal";
import PointHistory from "../point/PointHistory";
import NavButton from "../ui/NavButton";

import styles from "./LogLayout.module.css";

function LogLayout() {
  const { logId } = useParams();
  const [logData, setLogData] = useState(null);
  const [error, setError] = useState(null);

  // 비밀번호 모달
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 현재 위치 정보
  const location = useLocation();
  const currentPath = location.pathname;

  // 페이지 분기
  const isHabits = currentPath.includes("habits");
  const isFocus = currentPath.includes("focus");
  const isDetail = !isHabits && !isFocus;

  // 토스트 컨텍스트
  const { showToast } = useOutletContext();

  // 로그 데이터
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const data = await getLogById(logId);
        setLogData(data);
      } catch (err) {
        console.error("로그 데이터 불러오기 실패:", err);
        setError("로그 정보를 불러올 수 없습니다.");
      }
    };
    fetchLog();
  }, [logId]);

  // 비밀번호 검증
  useEffect(() => {
    const handleAuthExpired = () => {
      showToast(
        "warning",
        "🚨 인증이 만료되었습니다. 다시 비밀번호를 입력해주세요.",
      );

      sessionStorage.removeItem(`${TOKEN_PREFIX}${logId}`);

      setIsAuthModalOpen(true);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, [showToast, logId]);

  // TODO: 에러, 로딩 처리 추가 필요
  if (error) return <div>{error}</div>;

  if (!logData) return <div>로딩중</div>;

  const todayHabitsPath = ROUTES.TODAY_HABITS.replace(":logId", logId);
  const todayFocusPath = ROUTES.TODAY_FOCUS.replace(":logId", logId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 1. 상세 페이지 상단: 이모지, 로그 공유, 수정, 삭제 */}
        {isDetail && <></>}

        {/* 2. 타이틀 영역: 타이틀 + nav버튼 */}
        <div className={styles.titleContainer}>
          <h2 className={styles.logTitle}>{logData.name}</h2>
          <div className={styles.navButtons}>
            {/* 현재 있는 페이지 버튼은 보이지 않도록 처리했습니다. */}
            <NavButton pageName="오늘의 습관" to={todayHabitsPath} />
            <NavButton pageName="오늘의 집중" to={todayFocusPath} />
            <NavButton pageName="홈" to={ROUTES.HOME} />
          </div>
        </div>

        {/* 3. 상세 페이지 소개: 로그 소개 */}
        {isDetail && <></>}

        {/* 4. 날짜(습관), 포인트(상세,집중) 영역 */}
        <>
          {isHabits ? (
            <div className={styles.timeBox}>
              <div className={styles.timeLabel}>현재 시간</div>
              <div className={styles.timeValue}>{nowTime()}</div>
            </div>
          ) : (
            <div className={styles.pointContainer}>
              <span>현재까지 획득한 포인트</span>
              {/* 포인트 처리 확인하기 */}
              <PointHistory />
            </div>
          )}
        </>

        {/* 5. 콘텐츠 영역 */}
        <div className={styles.contentContainer}>
          <Outlet context={{ logData, showToast }} />
        </div>
      </div>

      {/* 비밀번호 모달 */}
      <PasswordConfirmModal
        isOpen={isAuthModalOpen}
        logId={logId}
        title={logData.name}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          showToast("success", "🎉 인증되었습니다!");
        }}
      />
    </div>
  );
}

export default LogLayout;

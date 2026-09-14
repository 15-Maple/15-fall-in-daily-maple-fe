import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { getLogById, deleteLog as requestDeleteLog } from "../api/logs.js";
import { removeRecentLog } from "../utils/recentLogs.js";

import Modal from "../components/common/Modal.jsx";
import PasswordConfirmModal from "../components/common/PasswordConfirmModal.jsx";
import HabitTable from "../components/habit/habitTable.jsx";
//import Nohabit from "../components/habit/noHabit.jsx";
import PointHistory from "../components/point/PointHistory";
import Reaction from "../components/reaction/Reaction";
import NavButton from "../components/ui/NavButton.jsx";

import { TOKEN_PREFIX } from "../constants/auth";
import { ROUTES } from "../constants/routes.js";

import styles from "./LogDetail.module.css";

function LogDetail() {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  console.log("log", log);
  // 비밀번호 모달
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // 비밀번호 모달 타입: edit(수정), delete(삭제)
  const [authActionType, setAuthActionType] = useState("");

  // 일반 모달(컨펌)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 토스트 컨텍스트
  const { showToast } = useOutletContext();

  useEffect(() => {
    if (!logId) return;

    const fetchLog = async () => {
      const data = await getLogById(logId);
      setLog(data);
    };
    fetchLog();
  }, [logId]);

  //공유하기 버튼
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      // alert("링크가 복사되었습니 다람쥐 🐿️");
      // 토스트로 변경하였습니다!
      showToast("success", "링크가 복사되었습니 다람쥐 🐿️");
    } catch (error) {
      console.log("링크복사 실패", error);
    }
  };

  //수정하기 버튼
  const handleUpdateLog = () => {
    navigate(`/logdetail/${logId}/update`);
  };

  const todayHabitsPath = ROUTES.TODAY_HABITS.replace(":logId", logId);
  const todayFocusPath = ROUTES.TODAY_FOCUS.replace(":logId", logId);
  // 로그 삭제하기
  const handleDeleteLog = async () => {
    try {
      // 로그 삭제
      await requestDeleteLog(logId);
      // 로컬 스토리지에 저장되는 로그 삭제
      removeRecentLog(logId);
      navigate("/");
    } catch (error) {
      console.error("로그 삭제 실패:", error);
    }
  };

  const handleDeleteClick = () => {
    // 세션에 토큰이 있는지 확인
    const hasToken = !!sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

    if (!hasToken) {
      // 토큰이 없는 경우, 비밀번호 확인 창
      setAuthActionType("delete");
      setIsAuthModalOpen(true);
      return;
    }

    // 토큰 있으면 삭제 확인 창(예/아니오)
    setIsConfirmOpen(true);
  };

  const handleEditClick = () => {
    // 세션에 토큰이 있는지 확인
    const hasToken = !!sessionStorage.getItem(`${TOKEN_PREFIX}${logId}`);

    if (!hasToken) {
      // 토큰이 없는 경우, 비밀번호 확인 창
      setAuthActionType("edit");
      setIsAuthModalOpen(true);
      return;
    }

    // 토큰 있으면 원래 하려던 동작 실행 (수정 페이지로 이동)
    handleUpdateLog();
  };

  return (
    <>
      <main className={styles.page}>
        <section className={styles.content}>
          <div className={styles.topArea}>
            <div className={styles.leftArea}>
              <Reaction />

              <h1 className={styles.title}>
                {log ? log.name : "연우의 개발공장"}
              </h1>

              <div className={styles.mobileHabitMenu}>
                <NavButton pageName="오늘의 습관" to={todayHabitsPath} />

                <NavButton pageName="오늘의 집중" to={todayFocusPath} />
              </div>

              <div className={styles.sub}>
                <p className={styles.label}>소개</p>

                <p className={styles.desc}>
                  {log
                    ? log.description
                    : "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅!"}
                </p>
              </div>

              <div className={styles.pointText}>현재까지 획득한 포인트</div>

              <PointHistory logId={logId} />
            </div>

            <div className={styles.rightArea}>
              <div className={styles.menu}>
                <button className={styles.share} onClick={handleShare}>
                  공유하기
                </button>
                <span className={styles.barOne}>|</span>
                <button onClick={handleEditClick}>수정하기</button>
                <span className={styles.barTwo}>|</span>
                <button
                  className={styles.deleteBtn}
                  onClick={handleDeleteClick}
                >
                  스터디 삭제하기
                </button>
              </div>

              <div className={styles.habitMenu}>
                <NavButton pageName="오늘의 습관" to={todayHabitsPath} />

                <NavButton pageName="오늘의 집중" to={todayFocusPath} />
              </div>
            </div>
          </div>
          <HabitTable logId={logId} />
        </section>
      </main>

      {/* 비밀번호 모달 */}
      <PasswordConfirmModal
        isOpen={isAuthModalOpen}
        logId={logId}
        title={log?.name || ""}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthActionType(""); // 초기화
        }}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          showToast("success", "🎉 인증되었습니다!");

          if (authActionType === "edit") {
            handleUpdateLog(); // 수정 페이지
          } else if (authActionType === "delete") {
            setIsConfirmOpen(true); // 삭제 컨펌 모달
          }

          setAuthActionType(""); // 초기화
        }}
      />

      {/* 삭제확인 컨펌 */}
      {isConfirmOpen && (
        <Modal
          confirmText="예"
          content="정말 삭제하시겠습니까?"
          isOpen={isConfirmOpen}
          type="confirm"
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            handleDeleteLog();
            setIsConfirmOpen(false);
          }}
        />
      )}
    </>
  );
}

export default LogDetail;

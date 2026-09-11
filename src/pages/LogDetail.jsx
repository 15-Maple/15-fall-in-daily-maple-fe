import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getLog } from "../api/logs.js";

import HabitTable from "../components/habit/habitTable.jsx";
//import Nohabit from "../components/habit/noHabit.jsx";
import PointHistory from "../components/point/PointHistory";
import Reaction from "../components/reaction/Reaction";
import NavButton from "../components/ui/NavButton.jsx";

import { ROUTES } from "../constants/routes";

import styles from "./LogDetail.module.css";

function LogDetail() {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  console.log(log);

  useEffect(() => {
    const fetchLog = async () => {
      const data = await getLog(logId);
      setLog(data);
    };
    fetchLog();
  }, [logId]);

  //공유하기 버튼
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("링크가 복사되었습니다람쥐 🐿️");
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

  return (
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
              <button onClick={handleUpdateLog}>수정하기</button>
              <span className={styles.barTwo}>|</span>
              <button className={styles.deleteBtn}>스터디 삭제하기</button>
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
  );
}

export default LogDetail;

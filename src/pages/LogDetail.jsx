import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getLog } from "../api/logs.js";

import HabitTable from "../components/habit/habitTable.jsx";
import Nohabit from "../components/habit/noHabit.jsx";
import PointHistory from "../components/point/PointHistory";
import Reaction from "../components/reaction/Reaction";

import arrow from "../assets/ic-arrow-right.svg";

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

  const handleUpdateLog = () => {
    navigate(`/logdetail/${logId}/update`);
  };

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.topArea}>
          <div className={styles.leftArea}>
            <Reaction />

            <h1 className={styles.title}>
              {log ? log.name : "연우의 개발공장"}
            </h1>

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
              <button className={styles.share}>공유하기</button>
              <span className={styles.barOne}>|</span>
              <button onClick={handleUpdateLog}>수정하기</button>
              <span className={styles.barTwo}>|</span>
              <button className={styles.deleteBtn}>스터디 삭제하기</button>
            </div>

            <div className={styles.habitMenu}>
              <Link to="/todayhabits" className={styles.todayHabit}>
                오늘의 습관
                <img src={arrow} />
              </Link>
              <Link to="/today-focus" className={styles.todayFocus}>
                오늘의 집중
                <img src={arrow} />
              </Link>
            </div>
          </div>
        </div>
        <HabitTable />
        <Nohabit />
      </section>
    </main>
  );
}

export default LogDetail;

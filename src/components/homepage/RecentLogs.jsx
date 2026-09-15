import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getHomeLogs } from "../../api/logs.js";
import { getRecentLogIds } from "../../utils/recentLogs.js";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function RecentLogs() {
  const [recentLogs, setRecentLogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentLogs = async () => {
      try {
        // localStorage에서 최근 조회한 로그 id 가져오기
        const recentIds = getRecentLogIds();

        // 최근 조회 기록이 없으면 API 호출 안 함
        if (recentIds.length === 0) {
          setRecentLogs([]);
          return;
        }

        // 최신 홈 로그 데이터 가져오기
        const logs = await getHomeLogs();

        // id로 빠르게 찾기 위한 Map
        const logsMap = new Map(logs.map((log) => [log.id, log]));

        // 최근 조회 순서를 유지하면서 최신 로그 데이터 가져오기
        const latestRecentLogs = recentIds
          .map((id) => logsMap.get(id))
          .filter(Boolean);

        setRecentLogs(latestRecentLogs);
      } catch (error) {
        console.error("최근 조회 로그 불러오기 실패:", error);
      }
    };

    fetchRecentLogs();
  }, []);

  return (
    <section className={styles.recentLogs}>
      <h2 className={styles.sectionTitle}>최근 조회한 로그</h2>

      <div className={styles.recentLogsList}>
        {recentLogs.length === 0 ? (
          <p className={styles.emptyMessage}>아직 조회한 로그가 없어요</p>
        ) : (
          recentLogs.map((log) => (
            <LogCard
              key={log.id}
              name={log.name}
              background={log.background}
              description={log.description}
              elapsedDays={log.elapsedDays}
              point={log.point}
              reactions={log.reactions}
              onClick={() => navigate(`/logdetail/${log.id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RecentLogs;

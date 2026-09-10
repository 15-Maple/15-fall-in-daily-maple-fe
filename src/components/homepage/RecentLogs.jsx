import { useState } from "react";

import { getRecentLogs } from "../../utils/recentLogs.js";

import styles from "../../pages/Home.module.css";

import LogCard from "./LogCard";

function RecentLogs() {
  const [recentLogs] = useState(() => getRecentLogs());

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
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RecentLogs;

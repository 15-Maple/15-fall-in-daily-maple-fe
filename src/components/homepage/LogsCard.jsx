import styles from "../../pages/Home.module.css";

function LogsCard({
  name,
  description,
  point,
  emojiCount,
  elapsedDays,
  background,
}) {
  return (
    <article className={styles.logsCard}>
      <div className={styles.logsCardBackground}>{background}</div>

      <div className={styles.logsCardContent}>
        <h3 className={styles.logsCardTitle}>{name}</h3>

        <p className={styles.logsCardDescription}>{description}</p>

        <div className={styles.logsCardInfo}>
          <span>{point}P 획득</span>
          <span>{emojiCount}</span>
        </div>

        <p className={styles.logsCardDate}>{elapsedDays}일째 진행중</p>
      </div>
    </article>
  );
}

export default LogsCard;

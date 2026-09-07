import styles from "../../pages/Home.module.css";

function LogCard({
  background,
  backgroundImage,
  description,
  elapsedDays,
  name,
  point,
  reactions = [],
}) {
  const cardStyle =
    background === "image" && backgroundImage
      ? {
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.45)
          ), url(${backgroundImage})`,
        }
      : undefined;

  return (
    <article
      className={`${styles.logsCard} ${styles[background] ?? ""}`}
      style={cardStyle}
    >
      <div className={styles.logsCardHeader}>
        <div>
          <h3 className={styles.logsCardTitle}>{name}</h3>

          <p className={styles.logsCardDate}>{elapsedDays}일째 진행 중</p>
        </div>

        <span className={styles.logsCardPoint}>🌿 {point}P 획득</span>
      </div>

      <p className={styles.logsCardDescription}>{description}</p>

      <div className={styles.logsCardReactions}>
        {reactions.map((reaction) => (
          <span key={reaction.emoji} className={styles.logsCardReaction}>
            {reaction.emoji} {reaction.count}
          </span>
        ))}
      </div>
    </article>
  );
}

export default LogCard;

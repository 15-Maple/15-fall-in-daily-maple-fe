//하나의 이모지와 그 옆에 숫자 표시
import styles from "./ReactionItem.module.css";

function ReactionItem({ emoji, count }) {
  return (
    <div className={styles.reactionItem}>
      <span>{emoji}</span>
      <sapn>{count}</sapn>
    </div>
  );
}

export default ReactionItem;

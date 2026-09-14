//하나의 이모지와 그 옆에 숫자 표시
import styles from "./ReactionItem.module.css";

function ReactionItem({ emoji, count, onEmojiClick }) {
  return (
    <div className={styles.reactionItem} onClick={() => onEmojiClick(emoji)}>
      <span>{emoji}</span>
      <span>{count}</span>
    </div>
  );
}

export default ReactionItem;

//아이템 여러개로 묶어서 보여줌
import ReactionItem from "./ReactionItem";

import styles from "./ReactionList.module.css";

function ReactionList({ reactions }) {
  return (
    <div className={styles.reactionList}>
      {/* 리액션에 있는 개수만큼 아이템 만들기 */}
      {reactions.map((item) => (
        <ReactionItem key={item.emoji} count={item.count} emoji={item.emoji} />
      ))}
    </div>
  );
}

export default ReactionList;

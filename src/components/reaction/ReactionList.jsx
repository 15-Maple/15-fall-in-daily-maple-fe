import ReactionItem from "./ReactionItem";

//현재 받은 응원 이모지 목록을 보여주는 컴포넌트
import styles from "./ReactionList.module.css";

function ReactionList() {
  const reactions = [
    {
      emoji: "🥍",
      count: 37,
    },
    {
      emoji: "🔫",
      count: 35,
    },
    {
      emoji: "❤️",
      count: 32,
    },
  ];

  return (
    <div className={styles.reactionList}>
      {reactions.map((item) => (
        <ReactionItem key={item.emoji} count={item.count} emoji={item.emoji} />
      ))}
    </div>
  );
}

export default ReactionList;

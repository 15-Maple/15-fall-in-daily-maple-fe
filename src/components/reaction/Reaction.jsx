// 이모지 기능 전체 담당 하위 컴포넌트 연결
import ReactionAddButton from "./ReactionAddButton";
import ReactionList from "./ReactionList";
import ReactionSelector from "./ReactionSelector";

import styles from "./Reaction.module.css";

function Reaction() {
  return (
    <section>
      <div className={styles.reactionContent}>
        <ReactionList />
        <ReactionAddButton />
      </div>
      <ReactionSelector />
    </section>
  );
}

export default Reaction;

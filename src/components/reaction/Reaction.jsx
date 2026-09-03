// 이모지 기능 전체 담당 하위 컴포넌트 연결
import { useState } from "react";

import ReactionAddButton from "./ReactionAddButton";
import ReactionList from "./ReactionList";
import ReactionSelector from "./ReactionSelector";

import styles from "./Reaction.module.css";

function Reaction() {
  const EmojiClick = (emoji) => {
    console.log(emoji);
  };

  //이모지창 처음에 닫혀있음
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className={styles.reactionContent}>
        <ReactionList />
        <ReactionAddButton setIsOpen={setIsOpen} />
      </div>

      {isOpen && <ReactionSelector onEmojiSelect={EmojiClick} />}
    </section>
  );
}

export default Reaction;

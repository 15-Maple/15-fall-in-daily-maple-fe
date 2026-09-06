import { useState } from "react";

import ReactionAddButton from "./ReactionAddButton";
import ReactionList from "./ReactionList";
import ReactionMore from "./ReactionMore";
import ReactionSelector from "./ReactionSelector";

import styles from "./Reaction.module.css";

function Reaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  //임시 데이터
  const [reactions, setReactions] = useState([
    {
      emoji: "👩🏻‍💻",
      count: 37,
    },
    {
      emoji: "👍",
      count: 11,
    },
    {
      emoji: "🤩",
      count: 9,
    },
    {
      emoji: "🎶",
      count: 5,
    },
    {
      emoji: "🙈",
      count: 4,
    },
  ]);

  //같은 이모지면 +1
  const EmojiClick = (emoji) => {
    setReactions((prev) => {
      const sameReaction = prev.find((item) => {
        return item.emoji === emoji;
      });

      if (sameReaction) {
        const newReactions = prev.map((item) => {
          if (item.emoji === emoji) {
            return {
              ...item,
              count: item.count + 1,
            };
          }

          return item;
        });

        return newReactions;
      }

      //없으면 새 이모지 만들기
      const newReaction = {
        emoji: emoji,
        count: 1,
      };

      return [...prev, newReaction];
    });
  };

  //리액션 배열 복사해서 큰순으로 정렬
  const sortedReactions = [...reactions];
  sortedReactions.sort((a, b) => {
    return b.count - a.count;
  });

  //이모지 3개만 보여주기
  const topReactions = sortedReactions.slice(0, 3);
  const hiddenReactions = sortedReactions.slice(3);

  return (
    <section>
      <div className={styles.reactionContent}>
        <ReactionList reactions={topReactions} />
        <ReactionMore
          moreOpen={moreOpen}
          reactions={hiddenReactions}
          setMoreOpen={setMoreOpen}
        />

        <ReactionAddButton setIsOpen={setIsOpen} />
      </div>

      {isOpen && <ReactionSelector onEmojiSelect={EmojiClick} />}
    </section>
  );
}

export default Reaction;

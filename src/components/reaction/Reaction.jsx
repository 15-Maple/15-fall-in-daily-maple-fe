import { useState, useEffect } from "react";

import { getReaction, postReaction } from "../../api/reaction";

import ReactionAddButton from "./ReactionAddButton";
import ReactionList from "./ReactionList";
import ReactionMore from "./ReactionMore";
import ReactionSelector from "./ReactionSelector";

import styles from "./Reaction.module.css";

function Reaction() {
  //이모지 선택창 열기닫기
  const [isOpen, setIsOpen] = useState(false);
  //이모지 더보기창 열기닫기
  const [moreOpen, setMoreOpen] = useState(false);
  //백엔드에서 받아온데이터
  const [reactions, setReactions] = useState([]);

  //리액션 조회
  useEffect(() => {
    const fetchReactions = async () => {
      const responses = await getReaction(1);
      setReactions(responses);
    };
    fetchReactions();
  }, []);

  //같은 이모지면 +1 없으면추가
  const EmojiClick = async (emoji) => {
    await postReaction(1, emoji);

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

  //큰순으로 정렬
  const sortedReactions = [...reactions];
  sortedReactions.sort((a, b) => {
    return b.count - a.count;
  });

  //이모지 3개만 보여주기
  const topReactions = sortedReactions.slice(0, 3);

  //4번부터는 더보기
  const hiddenReactions = sortedReactions.slice(3);

  return (
    <section>
      <div className={styles.reactionContent}>
        {topReactions.length > 0 && <ReactionList reactions={topReactions} />}

        {/* 4번째 이후 리액션 더보기 */}
        {hiddenReactions.length > 0 && (
          <ReactionMore
            moreOpen={moreOpen}
            reactions={hiddenReactions}
            setIsOpen={setIsOpen}
            setMoreOpen={setMoreOpen}
          />
        )}

        <div className={styles.addPicker}>
          <ReactionAddButton setIsOpen={setIsOpen} />

          {/* 이모지선택창 표시 */}
          {isOpen && (
            <div className={styles.picker}>
              <ReactionSelector onEmojiSelect={EmojiClick} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Reaction;

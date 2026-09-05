//더보기 기능
import ReactionList from "./ReactionList";

import styles from "./ReactionMore.module.css";

function ReactionMore({ moreOpen, setMoreOpen, reactions }) {
  //3개보다 많으면 더보기
  const hiddenCount = reactions.length - 3;

  return (
    <div>
      {/* 히든카운트가 0보다크면 버튼표시 */}
      {hiddenCount > 0 && (
        <button
          className={styles.moreButton}
          onClick={() => setMoreOpen((prev) => !prev)}
        >
          + {hiddenCount}..
        </button>
      )}

      {/* 더보기 true면 박스오픈 */}
      {moreOpen && (
        <div className={styles.moreBox}>
          <ReactionList reactions={reactions} />
        </div>
      )}
    </div>
  );
}

export default ReactionMore;

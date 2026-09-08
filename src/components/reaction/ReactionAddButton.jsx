// 이모지 추가버튼 컴포넌트

import emoji from "../../assets/ic-emoji.svg";

import styles from "./ReactionAddButton.module.css";

function ReactionAddButton({ setIsOpen }) {
  return (
    <>
      <button
        className={styles.addButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img alt="이모지 추가 아이콘" src={emoji} className={styles.icon} />
        추가
      </button>
    </>
  );
}

export default ReactionAddButton;

// 이모지 추가버튼 컴포넌트

import styles from "./ReactionAddButton.module.css";

function ReactionAddButton({ setIsOpen }) {
  return (
    <>
      <button className={styles.addButton} onClick={() => setIsOpen(true)}>
        추가
      </button>
    </>
  );
}

export default ReactionAddButton;

import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../ui/Button.jsx";

import styles from "./HabitAddModal.module.css";

const MAX_HABIT_NAME_LENGTH = 30;

function HabitAddModal({ isOpen, onClose, onAdd, showToast }) {
  const [habitName, setHabitName] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setHabitName("");
    onClose();
  };

  const handleAdd = () => {
    const trimmedName = habitName.trim();

    if (!trimmedName) {
      return;
    }

    const isAdded = onAdd(trimmedName);

    if (isAdded) {
      setHabitName("");
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>새로운 습관을 입력해주세요</h2>

        <input
          autoFocus
          placeholder="습관 이름을 입력해주세요"
          type="text"
          value={habitName}
          className={styles.input}
          onChange={(e) => {
            const value = e.target.value;

            if (value.length > MAX_HABIT_NAME_LENGTH) {
              showToast(
                "warning",
                `습관 이름은 최대 ${MAX_HABIT_NAME_LENGTH}자까지 입력할 수 있어요.`,
              );

              setHabitName(value.slice(0, MAX_HABIT_NAME_LENGTH));
              return;
            }

            setHabitName(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }

            if (e.key === "Escape") {
              handleClose();
            }
          }}
        />

        <div className={styles.buttonGroup}>
          <Button size="xs" variant="cancel" onClick={handleClose}>
            취소
          </Button>

          <Button size="xs" onClick={handleAdd}>
            추가
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default HabitAddModal;

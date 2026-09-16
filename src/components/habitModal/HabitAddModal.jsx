import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../ui/Button.jsx";

import styles from "./HabitAddModal.module.css";

function HabitAddModal({ isOpen, onClose, onAdd }) {
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
          onChange={(e) => setHabitName(e.target.value)}
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

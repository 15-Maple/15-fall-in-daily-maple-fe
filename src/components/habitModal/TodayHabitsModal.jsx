import { useState } from "react";

import { syncTodayHabits } from "../../api/habit.js";
import { useTodayHabits } from "../../hooks/useTodayHabits.js";

import Button from "../ui/Button.jsx";

import trashcanIcon from "../../assets/ic-trashcan.svg";

import styles from "./TodayHabitsModal.module.css";

const MAX_HABIT_COUNT = 30;

function HabitsModal({ id, onClose, onSaved }) {
  const { habits, setHabits, isLoading, error } = useTodayHabits(id);

  const [isAdding, setIsAdding] = useState(false); // 새 습관 입력창 표시 여부
  const [newHabitName, setNewHabitName] = useState(""); // 새 습관 이름 저장
  const [placeholder, setPlaceholder] = useState("새로운 습관을 입력해주세요");

  const [editingHabitId, setEditingHabitId] = useState(null); // 수정 중인 습관의 id
  const [editingHabitName, setEditingHabitName] = useState(""); // (수정) input에 입력하고 있는 이름

  const [deletedIds, setDeletedIds] = useState([]); // 삭제한 "기존" 습관 id 모아두기 (저장할 때 한 번에 보냄)
  const [errorMessage, setErrorMessage] = useState(""); // 화면에 보여줄 에러 문구
  const [isSubmitting, setIsSubmitting] = useState(false); // 저장 중 중복 클릭 방지

  // 삭제 버튼: 바로 API 호출하지 않고 화면에서만 지우고, 기존 습관이면 삭제 목록에 담아둠
  const handleDelete = (habitId) => {
    const target = habits.find((habit) => habit.id === habitId);
    if (!target) return;

    if (!target.isNew) {
      setDeletedIds([...deletedIds, habitId]);
    }

    setHabits(habits.filter((habit) => habit.id !== habitId));

    if (editingHabitId === habitId) {
      setEditingHabitId(null);
      setEditingHabitName("");
    }
  };

  // Enter를 누르면 새 습관을 기존 습관 목록에 그대로 추가 (같은 배열, isNew로만 구분)
  const handleAddHabit = () => {
    const trimmedName = newHabitName.trim();
    if (!trimmedName) return;

    if (habits.length >= MAX_HABIT_COUNT) {
      setErrorMessage(`습관은 최대 ${MAX_HABIT_COUNT}개까지 등록할 수 있어요.`);
      return;
    }

    const isDuplicate = habits.some((habit) => habit.name === trimmedName);
    if (isDuplicate) {
      setErrorMessage("이미 같은 이름의 습관이 있어요.");
      return;
    }

    // 새로 추가한 습관은 임시로 현재 시간을 id로 사용 (서버에는 이름만 보냄)
    setHabits([...habits, { id: Date.now(), name: trimmedName, isNew: true }]);

    setNewHabitName("");
    setIsAdding(false);
    setErrorMessage("");
  };

  const handleEditHabit = () => {
    const habit = habits.find((habit) => habit.id === editingHabitId);
    if (!habit) return;

    const trimmedName = editingHabitName.trim();

    // 수정 중 이름이 전부 지워지면 원래 이름으로 되돌아가기
    if (!trimmedName) {
      setEditingHabitId(null);
      setEditingHabitName("");
      return;
    }

    const isDuplicate = habits.some(
      (h) => h.id !== editingHabitId && h.name === trimmedName,
    );
    if (isDuplicate) {
      setErrorMessage("이미 같은 이름의 습관이 있어요.");
      return;
    }

    // 수정 중인 습관만 새 이름으로 변경
    setHabits(
      habits.map((h) =>
        h.id === editingHabitId ? { ...h, name: trimmedName } : h,
      ),
    );

    setEditingHabitId(null);
    setEditingHabitName("");
    setErrorMessage("");
  };

  // 수정 완료: 화면에 있는 상태를 create / update / delete로 나눠서 한 번에 전송
  const handleSubmit = async () => {
    if (isSubmitting) return;

    const createList = [];
    const updateList = [];

    habits.forEach((habit) => {
      if (habit.isNew) {
        createList.push({ name: habit.name });
      } else {
        updateList.push({ id: habit.id, name: habit.name });
      }
    });

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await syncTodayHabits(id, {
        create: createList,
        update: updateList,
        delete: deletedIds,
      });
      onSaved(); // 저장 성공했을 때만 → 재조회 + 닫기
    } catch (err) {
      console.error("습관 목록 저장 실패:", err);
      setErrorMessage(err.message || "저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <p>에러가 발생했습니다: {error.message}</p>
          <div className={styles.btnLayout}>
            <Button size="sm" className={styles.cancelButton} onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h1 className={styles.title}>습관 목록</h1>
        <div className={styles.habitList}>
          {habits.length === 0 && (
            <p className={styles.emptyText}>
              아직 습관이 없어요
              <br />
              +버튼을 눌러 습관을 추가해보세요
            </p>
          )}

          {habits.map((habit) => (
            <div key={habit.id} className={styles.habitItem}>
              {/* 현재 수정 중인 id === 습관 id  
              input 보여주기

              아니면 원래 습관박스 보여주기 */}
              {editingHabitId === habit.id ? (
                <input
                  type="text"
                  value={editingHabitName}
                  className={styles.habitName}
                  onChange={(e) => setEditingHabitName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEditHabit();
                    }
                  }}
                />
              ) : (
                <div
                  className={styles.habitName}
                  onClick={() => {
                    setEditingHabitId(habit.id);
                    setEditingHabitName(habit.name);
                  }}
                >
                  {habit.name}
                </div>
              )}

              <button
                aria-label={`${habit.name} 삭제`}
                className={styles.habitDelete}
                onClick={() => handleDelete(habit.id)}
              >
                <img
                  alt=""
                  src={trashcanIcon}
                  className={styles.habitDeleteIcon}
                />
              </button>
            </div>
          ))}
        </div>

        {isAdding && (
          <div className={styles.habitAddLayout}>
            <input
              placeholder={placeholder}
              type="text"
              value={newHabitName}
              className={styles.habitName}
              onBlur={() => setPlaceholder("새로운 습관을 입력해주세요")}
              onChange={(e) => setNewHabitName(e.target.value)}
              onFocus={() => setPlaceholder("")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddHabit();
                }
              }}
            />
            <div className={styles.habitAddSpacer} />
          </div>
        )}
        <div className={styles.habitAddLayout}>
          <button
            disabled={habits.length >= MAX_HABIT_COUNT}
            className={styles.habitAdd}
            onClick={() => setIsAdding(true)}
          >
            +
          </button>
          <div className={styles.habitAddSpacer} />
        </div>

        {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

        <div className={styles.btnLayout}>
          <Button
            disabled={isSubmitting}
            size="sm"
            className={styles.cancelButton}
            onClick={onClose}
          >
            취소
          </Button>

          <Button disabled={isSubmitting} size="sm" onClick={handleSubmit}>
            {isSubmitting ? "저장 중..." : "수정 완료"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HabitsModal;

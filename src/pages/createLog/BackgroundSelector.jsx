import { BACKGROUNDS } from "../../constants/backgrounds.js";

import backgroundSelectorImg from "./creatLogImg/background_select_yellow.svg";

import styles from "./BackgroundSelector.module.css";

// value: 현재 선택된 배경의 id
// onChange: 사용자가 다른 배경을 선택했을 때 실행할 함수, setSelectedBackground 실행
function BackgroundSelector({ value, onChange }) {
  return (
    <div className={styles.backgroundGrid}>
      {BACKGROUNDS.map((background) => {
        // 현재 배경이 선택되었는지 확인
        const isSelected = value === background.id;

        return (
          <label
            key={background.id}
            className={`${styles.backgroundItem} ${isSelected ? styles.selected : ""}`}
          >
            <input
              name="background"
              checked={isSelected}
              type="radio"
              value={background.id}
              className={styles.radio}
              onChange={(event) => onChange(event.target.value)}
            />

            <img
              alt={`${background.name} 배경`}
              src={background.image}
              className={styles.image}
            />
            <img
              alt="선택된 배경 표시"
              src={backgroundSelectorImg}
              className={`${styles.selector} ${isSelected ? styles.selectorOn : styles.selectorOff}`}
            />
          </label>
        );
      })}
    </div>
  );
}

export default BackgroundSelector;

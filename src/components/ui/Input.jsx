import clsx from "clsx";
import { useId, useState } from "react";

import offIcon from "../../assets/btn_visibility_off_24px.svg";
import onIcon from "../../assets/btn_visibility_on_24px.svg";

import styles from "./Input.module.css";

// 현재는 password(모달전용) input이지만 컴포넌트 통합 예정
function Input({ value, onChange, error }) {
  const uniqueId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={uniqueId} className={styles.inputLabel}>
        비밀번호
      </label>
      <div className={styles.inputBoxWrapper}>
        <div className={styles.inputWrapper}>
          <input
            id={uniqueId}
            placeholder="비밀번호를 입력해 주세요"
            type={showPassword ? "text" : "password"}
            value={value}
            className={clsx(styles.input, error && styles.error)}
            onChange={onChange}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={toggleVisibility}
          >
            <img
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
              src={showPassword ? offIcon : onIcon}
              className={styles.eyeButtonImg}
            />
          </button>
        </div>
        <p className={clsx(styles.errorMessage, !error && styles.hidden)}>
          {error ? error.message : "\u00A0"}
        </p>
      </div>
    </div>
  );
}
export default Input;

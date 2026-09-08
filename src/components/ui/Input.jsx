import { useState } from "react";

import offIcon from "../../assets/btn_visibility_off_24px.svg";
import onIcon from "../../assets/btn_visibility_on_24px.svg";

import styles from "./Input.module.css";

function Input({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputBoxWrapper}>
      <label className={styles.inputLabel}>비밀번호</label>
      <div className={styles.inputWrapper}>
        <input
          placeholder="비밀번호를 입력해 주세요"
          type={showPassword ? "text" : "password"}
          value={value}
          className={styles.input}
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
    </div>
  );
}
export default Input;

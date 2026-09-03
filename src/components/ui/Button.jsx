import clsx from "clsx";

import styles from "./Button.module.css";

function Button({ size = "md", children, icon }) {
  return (
    <button className={clsx(styles.btn, styles[size])}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;

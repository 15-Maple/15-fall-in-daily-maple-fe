import Button from "../ui/Button";

import logoImg from "../../assets/ic-logo.svg";

import styles from "./Header.module.css";

function Header({ showCreateButton = false }) {
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img
            alt="fall in daily 텍스트 로고"
            src={logoImg}
            className={styles.logoImage}
          />
        </div>
        {showCreateButton && (
          <div className={styles.buttonWrapper}>
            <Button className={styles.headerBtn}>로그 만들기</Button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;

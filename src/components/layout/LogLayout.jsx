import { ROUTES } from "../../constants/routes";
import NavButton from "../ui/NavButton";

import styles from "./LogLayout.module.css";

function LogLayout({ title, info, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 1. 타이틀 영역: 타이틀 + nav버튼 */}
        <div className={styles.titleContainer}>
          <h2 className={styles.logTitle}>{title}</h2>
          <div className={styles.navButtons}>
            {/* 현재 있는 페이지 버튼은 보이지 않도록 처리했습니다. */}
            <NavButton pageName="오늘의 습관" to={ROUTES.TODAY_HABITS} />
            <NavButton pageName="오늘의 집중" to={ROUTES.TODAY_FOCUS} />
            <NavButton pageName="홈" to={ROUTES.HOME} />
          </div>
        </div>

        {/* 2. 현재 인포 영역: 포인트, 현재 날짜 시간 등 -> 스타일링은 호출하는 곳에서*/}
        <div className={styles.infoContainer}>{info}</div>

        {/* 3. 콘텐츠 영역 */}
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
}

export default LogLayout;

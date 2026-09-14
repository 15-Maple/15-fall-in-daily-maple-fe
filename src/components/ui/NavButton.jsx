import { Link, useLocation } from "react-router-dom";

import arrowIcon from "../../assets/ic-arrow.svg";

import styles from "./NavButton.module.css";

// to: 이동할 주소, pageName: 버튼 안에 들어갈 글자
function NavButton({ to, pageName }) {
  const location = useLocation();

  // 현재 페이지의 주소(location.pathname)와 버튼이 가야 할 주소(to)가 같다면 아예 아무것도 그리지 않음(null 반환)
  if (location.pathname === to) {
    return null;
  }

  // 주소가 다를 때만(다른 페이지일 때만) 버튼을 보여줌
  return (
    <Link to={to} className={styles.navBtn}>
      <span className={styles.pageName}>{pageName}</span>
      <div className={styles.iconWrapper}>
        <img
          alt={pageName + "버튼 아이콘"}
          src={arrowIcon}
          className={styles.icon}
        />
      </div>
    </Link>
  );
}

export default NavButton;

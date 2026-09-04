import acornSvg from "../../assets/ic-acorn.svg";

import styles from "./AcornSticker.module.css";

/**
 * 도토리 스티커 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {string} [props.bgColor="#d2e869"] - 스티커 배경 색상 (CSS 변수 또는 Hex 코드 입력)
 * @returns {JSX.Element}
 */
function AcornSticker({ bgColor = "var(--color-sticker-yellow-200)" }) {
  return (
    <div className={styles.circleBg} style={{ backgroundColor: bgColor }}>
      <img alt="도토리 아이콘" src={acornSvg} className={styles.acornImg} />
    </div>
  );
}

export default AcornSticker;

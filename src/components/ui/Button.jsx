import clsx from "clsx";

import styles from "./Button.module.css";

/**
 * 프로젝트 전체에서 공통으로 사용하는 다목적 텍스트 버튼입니다.
 * 💡 onClick, disabled, type 등 기본 <button> 태그의 속성을 모두 전달할 수 있습니다.
 *
 * @param {Object} props
 * @param {"xl" | "lg" | "md" | "sm" | "xs"} [props.size="md"] - 버튼의 크기 (기본값: "md")
 * @param {React.ReactNode} props.children - 버튼 내부에 들어갈 텍스트
 * @param {string} [props.className] - 추가로 덮어씌울 커스텀 CSS 클래스명
 * @returns {JSX.Element}
 */
function Button({ size = "md", children, className, ...rest }) {
  return (
    <button className={clsx(styles.btn, styles[size], className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;

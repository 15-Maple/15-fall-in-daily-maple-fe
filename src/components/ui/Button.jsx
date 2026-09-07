import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./Button.module.css";

/**
 * 프로젝트 전체에서 공통으로 사용하는 다목적 텍스트 버튼입니다.
 * 💡 onClick, disabled 등 기본 <button> 태그의 속성을 모두 전달할 수 있습니다.
 *
 * @param {Object} props
 * @param {"button" | "submit" | "reset"} [props.type="button"] - 버튼의 HTML 타입 (기본값: "button")
 * @param {"xl" | "lg" | "md" | "sm" | "xs"} [props.size="md"] - 버튼의 크기 (기본값: "md")
 * @param {"cancel" | ""} [props.variant=""] - 버튼의 스타일 테마 (예: "cancel" 입력 시 회색 취소 버튼)
 * @param {React.ReactNode} props.children - 버튼 내부에 들어갈 텍스트 또는 요소
 * @param {string} [props.className] - 추가로 덮어씌울 커스텀 CSS 클래스명
 * @param {string} [props.to] - 이동할 라우터 경로 (입력 시 Link 컴포넌트로 렌더링됨)
 * @returns {JSX.Element}
 */
function Button({
  type = "button",
  size = "md",
  children,
  className,
  to,
  variant = "",
  ...rest
}) {
  // 버튼 클래스 정의
  const buttonClass = clsx(
    styles.btn,
    styles[size],
    className,
    variant === "cancel" ? styles.cancel : "",
  );

  // to 값이 전달되면 <Link> 태그로 렌더링
  if (to) {
    return (
      <Link to={to} className={buttonClass} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={buttonClass} {...rest}>
      {children}
    </button>
  );
}

export default Button;

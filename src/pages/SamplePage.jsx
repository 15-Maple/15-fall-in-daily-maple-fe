import AcornSticker from "../components/common/AcornSticker";
import TimerButton from "../components/ui/TimerButton";

function SamplePage() {
  return (
    <ul>
      페이지 및 라우트 추가 가이드
      <li>
        {"1. src > pages 디렉토리에 새로운 페이지 컴포넌트 파일을 생성합니다."}
      </li>
      <li>
        {"2. src > constants > routes.js 파일에 새로운 경로 상수를 추가합니다."}
      </li>
      <li>
        {
          "3. src > App.jsx 파일의 router 내부 children 배열에 객체({ path, element })를 추가합니다."
        }
      </li>
      <li>
        {/* 도토리 추가 예시 */}
        <AcornSticker bgColor={"#d2e869"} />{" "}
        <AcornSticker bgColor={"var(--color-sticker-blue-100)"} />
      </li>
      <li>
        {/* 타이머 버튼 */}
        <TimerButton size="sm" type="stop" />
        <TimerButton size="lg" type="stop" />
        <TimerButton size="sm" type="start" />
        <TimerButton size="lg" type="start" />
      </li>
    </ul>
  );
}

export default SamplePage;

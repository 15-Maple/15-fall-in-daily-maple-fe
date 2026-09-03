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
    </ul>
  );
}

export default SamplePage;

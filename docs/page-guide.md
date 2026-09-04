## 🚀 새로운 페이지 추가하는 방법

프로젝트에 새로운 화면을 추가할 때는 아래 3단계를 진행해 주세요.
(참고: `src/pages/SamplePage.jsx` 파일을 복사해서 시작하시면 편리합니다.)

### 1. 페이지 컴포넌트 생성

- `src/pages` 폴더 내부에 새로운 페이지 파일을 생성합니다. (예: `MyPage.jsx`)

### 2. 경로 상수 등록

- `src/constants/routes.js` 파일에 URL 경로를 추가합니다.
- 예시: `MY_PAGE: "/mypage"`

### 3. 라우터에 연결

- `src/App.jsx` 파일의 `children` 배열 안에 라우트 객체를 추가합니다.
- 예시: `{ path: ROUTES.MY_PAGE, element: <MyPage /> }`

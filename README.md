# 🐿️ Fall in Daily (Front-End)

> Fall in Daily : 도토리 모으는 일상 습관 <br> Maple 팀의 프론트엔드 레포지토리입니다.

## 🛠️ 기술 스택 (Tech Stack)

- **프레임워크:** React 18 + Vite
- **스타일링:** CSS Modules (글로벌 세팅: `index.css`)
- **주요 라이브러리:** `axios`, `react-router-dom`, `date-fns`, `react-hot-toast`
- **코드 품질 관리:** ESLint, Prettier, Stylelint

> **🔖 코드 퀄리티를 위한 추가 도구 안내**
> 여러 명이 함께 개발해도 동일한 규칙의 코드를 유지하기 위해 아래 두 가지 도구를 추가로 세팅해 두었습니다. (.vscode폴더에 세팅해두어 자동으로 동작합니다.)
>
> - **Stylelint (스타일린트):** CSS용 문법 검사기입니다. CSS를 작성할 때 안 쓰는 속성이나 오타를 잡아주고, 규칙에 맞게 정렬해 줍니다.
> - **Perfectionist (퍼펙셔니스트):** 코드를 정렬해 주는 ESLint 플러그인입니다. 뒤죽박죽 섞인 `import` 순서나 객체의 키(key) 값들을 저장할 때마다 보기 좋게 자동 정렬해 줍니다.

## 🚀 시작 가이드 (Getting Started)

프로젝트를 클론하고 개발을 시작하기 위한 초기 세팅 방법입니다.

### 1. 프로젝트 클론 및 폴더 열기

```bash
git clone https://github.com/15-Maple/15-fall-in-daily-maple-fe.git
```

원하는 위치에 이동하여 git clone 명령어 실행 후, VS Code에서 클론 받은 폴더를 열어주세요. (현재 위치에서 깃허브 리포지토리 이름으로 폴더가 생성됨)

### 2. 확장 프로그램 설치

VS Code 우측 하단에 **"이 작업 영역에 권장되는 확장 프로그램이 있습니다"** 팝업이 뜨면 [설치]를 눌러주세요.
_(설치 목록: Prettier, ESLint, Stylelint)_

> 📌 이 확장을 설치해야 코드를 저장(Ctrl+S)할 때마다 정렬이 되어 프로젝트에서 일관성 있는 코드를 작성할 수 있습니다.

### 3. 패키지 설치 및 실행

VS Code 터미널을 열고 아래 명령어를 순서대로 입력하세요.

```bash
# 1. 패키지 다운로드
npm install

# 2. 로컬 서버 실행
npm run dev
```

## 📂 폴더 구조 (Directory Architecture)

```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┗ 📂layout
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂utils
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜main.jsx
```

- `api/` : 백엔드 API 통신 관련 코드 (axios or fetch)
- `assets/` : 이미지, 아이콘 등 정적 파일
- `components/` : 화면을 구성하는 UI 조각들 (도메인별로 폴더를 나누어 작업합니다: habit, log 등)
- `constants/` : 프로젝트 공통 상수 (에러 메시지 등)
- `hooks/` : 커스텀 훅 모음
- `pages/` : 브라우저 URL과 1:1로 매칭되는 전체 화면 도화지
- `utils/` : 날짜 변환 등 공통 도우미 함수

## 💻 사용 가능한 스크립트 명령어

- `npm run dev` : 개발용 서버를 켭니다.
- `npm run lint:fix` : 자바스크립트 문법 에러를 검사하고, 고칠 수 있는 건 자동으로 고칩니다.
- `npm run format` : 프로젝트 전체 파일의 띄어쓰기/줄바꿈을 일괄 정렬합니다.

## 📚 팀 개발 가이드

원활한 협업을 위해 아래 문서들을 반드시 확인하고 작업해 주세요.

- [🔄 Git & PR 워크플로우 가이드](./docs/git-workflow.md)
- [📝 커밋 메시지 규칙 및 컨벤션](./docs/commit-rules.md)
- [🛣️ 새로운 페이지 추가 가이드](./docs/page-guide.md)

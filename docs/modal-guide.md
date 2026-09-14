## 🚀 공통 모달(Modal) 사용 방법

프로젝트 전체에서 공통으로 사용하는 `Modal` 컴포넌트의 사용 가이드입니다.
용도에 따라 `alert`, `confirm` 2가지 타입을 지원하며, React Portal을 통해 화면 최상단에 렌더링됩니다.

### 1. 기본 속성 (Props) 정리

| 속성명        | 타입     | 기본값     | 설명                                                         |
| :------------ | :------- | :--------- | :----------------------------------------------------------- |
| `isOpen`      | boolean  | (필수)     | 모달을 화면에 표시할지 여부 상태값                           |
| `onClose`     | function | (필수)     | 모달을 닫는 함수 (배경 클릭, 취소/나가기 버튼 클릭 시 동작)  |
| `type`        | string   | `"alert"`  | 모달의 종류 (`alert`, `confirm`)                             |     |
| `content`     | string   | -          | 모달 중앙 텍스트 내용 (`alert`, `confirm`, `prompt`용)       |
| `onConfirm`   | function | `onClose`  | 확인 버튼 클릭 시 실행할 커스텀 로직                         |
| `confirmText` | string   | `"확인"`   | 확인 버튼에 표시될 텍스트 변경                               |     |
| `closeText`   | string   | `"나가기"` | 우측 상단/하단 나가기 버튼 텍스트 (`prompt` 타입에서만 노출) |

### 2. 타입별 사용 예시

#### ① Alert (단순 알림창)

단순 내용 텍스트와 버튼 1개로 이루어진 alert 모달입니다.

```jsx
<Modal
  content="팝업 관련 메시지가 들어갑니다."
  isOpen={isAlertOpen}
  type="alert"
  onClose={() => setIsAlertOpen(false)}
/>
```

#### ② Confirm (확인/취소 선택창)

단순 내용 텍스트와 버튼 2개로 이루어진 confirm 모달입니다.
사용자의 선택(확인/취소)이 필요할 때 사용합니다.

```jsx
<Modal
  confirmText="예"
  content="정말 나가시겠습니까?"
  isOpen={isConfirmOpen}
  type="confirm"
  onClose={() => setIsConfirmOpen(false)}
  onConfirm={() => {
    console.log("필요 로직 실행");
    setIsConfirmOpen(false);
  }}
/>
```

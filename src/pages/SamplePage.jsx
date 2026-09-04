import { useState } from "react";

import AcornSticker from "../components/common/AcornSticker";
import Modal from "../components/common/Modal";
import Button from "../components/ui/Button";
import TimerButton from "../components/ui/TimerButton";

function SamplePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);

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
      <li>
        {/* 알럿창 */}
        <Button size="xs" type="button" onClick={() => setIsAlertOpen(true)}>
          알럿창
        </Button>
        <Modal
          content="팝업 관련 메시지가 들어갑니다."
          isOpen={isAlertOpen}
          type="alert"
          onClose={() => setIsAlertOpen(false)}
        />
      </li>
      <li>
        {/* 컨펌 */}
        <Button size="xs" type="button" onClick={() => setIsConfirmOpen(true)}>
          컨펌창
        </Button>
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
      </li>
      <li>
        {/* 프롬프트 */}
        <Button size="xs" type="button" onClick={() => setIsPromptOpen(true)}>
          프롬프트버튼
        </Button>
        <Modal
          confirmText="수정하러 가기"
          content="권한이 필요해요!"
          isOpen={isPromptOpen}
          title="삭제 확인"
          type="prompt"
          onClose={() => setIsPromptOpen(false)}
          onConfirm={() => {
            console.log("필요 로직 실행");
            setIsPromptOpen(false);
          }}
        >
          input 박스가 들어가는 곳
        </Modal>
      </li>
      <li>
        {/* 폼모달 */}
        <Button
          size="xs"
          type="button"
          onClick={() => setIsModalFormOpen(true)}
        >
          폼모달
        </Button>
        <Modal
          isOpen={isModalFormOpen}
          type="form"
          onClose={() => setIsModalFormOpen(false)}
        >
          전체 내용이 들어가는 곳
        </Modal>
      </li>
    </ul>
  );
}

export default SamplePage;

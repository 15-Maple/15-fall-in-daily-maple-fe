// 중복검사 관련 담당
// UpdateLog가 렌더링 되는 동안 훅도 실행된다.
import { useState } from "react";

import { nameCheck } from "../api/logs.js";

export function useNameDuplicateCheck({ originalName = "" } = {}) {
  // 로그 만들기: originalName = ""
  const normalizedOriginalName = originalName.trim();
  // 로그 이름 존재 여부 판별: {true: 수정하기, false: 만들기}
  const hasOriginalName = Boolean(normalizedOriginalName);

  // 이전 이름 저장
  const [previousOriginalName, setPreviousOriginalName] = useState(
    normalizedOriginalName,
  );
  // 수정 모드에서 기존 이름이 있으면 이미 통과한 이름으로 처리
  const [isNameChecked, setIsNameChecked] = useState(hasOriginalName);
  // 로그 이름 중복 검사 통과 여부 - 원래 이름 있으면 초기값 true
  const [isNamePassedDupCheck, setIsNamePassedDupCheck] =
    useState(hasOriginalName);
  // 중복 검사에 사용한 이름 저장
  const [checkedName, setCheckedName] = useState(normalizedOriginalName);
  // 중복 검사중인지 확인
  const [isNameChecking, setIsNameChecking] = useState(false);
  // 이름 중복 확인 에러
  const [nameCheckError, setNameCheckError] = useState("");

  // 최초의 로그 이름값과 다르면 갱신
  // 4에서 OriginalName 바뀌면 이하 조건 참이라 실행된다.
  if (previousOriginalName !== normalizedOriginalName) {
    setPreviousOriginalName(normalizedOriginalName);
    // 원래 이름은 중복 검사 통과한 것으로 간주
    setIsNameChecked(hasOriginalName);
    setIsNamePassedDupCheck(hasOriginalName);
    setCheckedName(normalizedOriginalName);
    setNameCheckError("");
  }

  // 로그 이름 변경시
  // 부모에게서 받을 value는 문자 제한이 적용된 sanitezedValue이어야 한다.
  const resetNameCheckOnChange = (value) => {
    // 중복 검사 버튼을 누른 시점의 name을 검사 대상으로 선언
    const currentName = value.trim();

    // 현재 이름이 이전에 중복검사 통과한 이름이면 true
    if (currentName && currentName === normalizedOriginalName) {
      setIsNameChecked(true);
      setIsNamePassedDupCheck(true);
      setCheckedName(currentName);
      return;
    }

    setIsNameChecked(false);
    setIsNamePassedDupCheck(false);
    setCheckedName("");
  };

  // 7에서 실행
  // 이름 중복 검사
  const checkName = async (value) => {
    // 현재 검사 대상
    const currentName = value.trim();
    // 이전 오류 메시지 지우기
    setNameCheckError("");

    // 현재 검사 대상 빈문자열이면 false 반환 -> 중복 검사 통과 못함
    if (!currentName) {
      resetNameCheckOnChange("");
      return false;
    }

    // 검사중으로 state 바꾸기 -> 검사중일 때 중복검사 버튼 비활성화
    setIsNameChecking(true);
    setIsNameChecked(false);
    setIsNamePassedDupCheck(false);
    setCheckedName("");

    // 현재 검사 대상인 currentName 중복 검사 api로 보낸다.
    try {
      // 검사 시행
      const isNameDuplicated = await nameCheck(currentName);

      // 검사 state 갱신
      setIsNameChecked(true);

      // 중복이 아니면 setIsNamePassedDupCheck = true
      // 중복이면 setIsNamePassedDupCheck = false
      setIsNamePassedDupCheck(!isNameDuplicated);
      setCheckedName(currentName);

      return !isNameDuplicated;
    } catch (error) {
      // API 통신 자체가 실패한 경우
      setNameCheckError("로그 이름 중복 확인에 실패했습니다.");
      throw error;
    } finally {
      setIsNameChecking(false);
    }
  };

  const isNameValid = (value) => {
    return (
      isNameChecked && isNamePassedDupCheck && checkedName === value.trim()
    );
  };

  return {
    isNameChecked,
    isNamePassedDupCheck,
    checkedName,
    isNameChecking,
    resetNameCheckOnChange,
    checkName,
    isNameValid,
    nameCheckError,
    setNameCheckError,
  };
}

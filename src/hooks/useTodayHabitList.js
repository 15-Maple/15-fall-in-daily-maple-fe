import { useEffect, useState } from "react";

import {
  createHabitCheck,
  deleteHabitCheck,
  getTodayHabits,
} from "../api/habit/habit.js";

export function useTodayHabitList(logId) {
  const [habits, setHabits] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { items: habits, hasNextPage } = await getTodayHabits(logId, {
          page: 1,
          limit: 6,
        });
        setHabits(habits);
        setHasNextPage(hasNextPage);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [logId]);

  const toggleCheck = async (habitId) => {
    const target = habits.find((h) => h.id === habitId);
    if (!target) {
      return; // 습관을 못 찾으면 아무 것도 하지 않고 종료
    }
    const wasChecked = target.isChecked;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, isChecked: !h.isChecked } : h,
      ),
    );

    try {
      // 상태에 따라 생성/삭제 분기
      if (wasChecked) {
        await deleteHabitCheck(habitId);
      } else {
        await createHabitCheck(habitId);
      }
    } catch (err) {
      console.error("습관 체크 저장 실패:", err);
      //3. 실패하면 롤백 + 알림
      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isChecked: !h.isChecked } : h,
        ),
      );
      throw err;
    }
  };
  const loadMore = async () => {
    //이미 로딩중이거나 마지막 페이지일떄
    if (isLoadingMore || !hasNextPage) {
      return;
    }
    const nextPage = page + 1;
    setIsLoadingMore(true);
    setPage(nextPage);
    try {
      const { items: addHabits, hasNextPage } = await getTodayHabits(logId, {
        page: nextPage,
        limit: 6,
      });
      setHabits((prev) => [...prev, ...addHabits]);
      setHasNextPage(hasNextPage);
    } catch (err) {
      console.log(`습관리스트 최신화 실패 Error-${err}`);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const refresh = async () => {
    // 습관리스트를 수정했을떄 재조회
    setHasNextPage(false);
    setPage(1);
    setIsLoading(true);

    try {
      const { items: habits, hasNextPage } = await getTodayHabits(logId, {
        page: 1,
        limit: 6,
      });
      setHabits(habits);
      setHasNextPage(hasNextPage);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    habits,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage,
    toggleCheck,
    loadMore,
    refresh,
  };
}

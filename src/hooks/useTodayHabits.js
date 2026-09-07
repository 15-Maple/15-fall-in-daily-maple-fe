import { useEffect, useState } from "react";

import { getTodayHabits } from "../api/habit/habit.js";

export function useTodayHabits(logId) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const habits = await getTodayHabits(logId);
        if (!cancelled) setHabits(habits);
      } catch (error) {
        if (!cancelled) setError(error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [logId]);

  return { habits, setHabits, isLoading, error };
}

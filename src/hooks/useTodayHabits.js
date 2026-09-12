import { useEffect, useState } from "react";

import { getTodayHabits } from "../api/habit/habit.js";

export function useTodayHabits(logId) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { items: habits } = await getTodayHabits(logId, {
          page: 1,
          limit: 30,
        });
        setHabits(habits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [logId]);

  return { habits, setHabits, isLoading, error };
}

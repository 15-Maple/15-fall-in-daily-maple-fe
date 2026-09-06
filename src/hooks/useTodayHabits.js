import { useEffect, useState } from "react";

import { getTodayHabits } from "../api/habit/habit.js";

export function useTodayHabits(logId) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodayHabits(logId)
      .then(setHabits)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [logId]);

  return { habits, setHabits, isLoading, error };
}

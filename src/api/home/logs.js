import axios from "axios";

export const getHomeLogs = async () => {
  const response = await axios.get("http://localhost:5001/api/home/logs");

  const logs = response.data.data.items;

  return logs.map((log) => ({
    ...log,

    point: log.points,

    reactions: log.reactions ?? [],

    elapsedDays:
      Math.floor(
        (new Date() - new Date(log.createdAt)) / (1000 * 60 * 60 * 24),
      ) + 1,
  }));
};

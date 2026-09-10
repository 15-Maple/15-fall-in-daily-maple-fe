import axios from "axios";

export const getHomeLogs = async () => {
  const response = await axios.get("http://localhost:5001/api/home/logs");

  const logs = response.data.data.items;

  const logsWithReactions = await Promise.all(
    logs.map(async (log) => {
      const reactionResponse = await axios.get(
        `http://localhost:5001/api/logs/${log.id}/reactions`,
      );

      return {
        ...log,

        point: log.points,

        reactions: reactionResponse.data.data ?? [],

        elapsedDays:
          Math.floor(
            (new Date() - new Date(log.createdAt)) / (1000 * 60 * 60 * 24),
          ) + 1,
      };
    }),
  );

  return logsWithReactions;
};

import fetchInstance from "src/lib/fetchInstance";

export const setTimer = async (body: {
  setFocusTime: string;
  setBreakTime: string;
  routineCnt: number;
  mode: string;
  taskName: string;
}) => {
  return await fetchInstance.post(`/api/timer`, body);
};

export const setTimerRecord = async (data: {
  timerId: number;
  body: { actualFocusTime: number; actualBreakTime: number };
}) => {
  fetchInstance.post(`/api/timer/${data.timerId}/complete`, data.body);
};

export const getTimerRecord = async (params: {
  startDate: string;
  endDate: string;
}) => {
  return await fetchInstance.get(`/api/timer/history/date-range`, {
    params: params,
  });
};

export const getTimerHistory = async () => {
  return await fetchInstance.get(`/api/timer/history`);
};

export const getTimerStats = async () => {
  return await fetchInstance.get(`/api/timer/stats`);
};

export const getTimerFeedback = async () => {
  return await fetchInstance.get(`/api/timer/stats/feedback`);
};

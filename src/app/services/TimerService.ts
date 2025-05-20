import fetchInstance from "src/lib/fetchInstance";

type setTimerDataBodyType = {
  setFocusTime: {
    seconds: number;
    nanos: number;
  };
  setBreakTime: {
    seconds: number;
    nanos: number;
  };
  setRoutineCnt: number;
  mode: string;
};

export const setTimerData = async (body: setTimerDataBodyType) => {
  return await fetchInstance.post(`/api/timer`, body);
};

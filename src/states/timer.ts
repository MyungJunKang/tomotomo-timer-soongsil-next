import { atom } from "jotai";

export const timerSettingAtom = atom({
  id: 0,
  title: "",
  focusTime: 0,
  restTime: 0,
  routineCnt: 0,
});

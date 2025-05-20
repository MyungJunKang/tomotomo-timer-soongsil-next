import { atom } from "jotai";

export const timerSettingAtom = atom({
  title: "",
  focusTime: 0,
  restTime: 0,
  routineCnt: 0,
});

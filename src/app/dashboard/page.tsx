"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import { useAtom } from "jotai";
import { modalPortalAtom } from "src/states/modal";
import { timerSettingAtom } from "src/states/timer";
import Tomo from "../../assets/tomo.png";
import { SettingBox } from "./_components/SettingBox";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

type Phase = "focus" | "rest" | "done";

const DashboardPage = () => {
  // 예시: props나 상태에서 받아올 수도 있음
  const [timerSetting, setTimerSetting] = useAtom(timerSettingAtom);
  // 아래 값은 실제로는 props나 jotai 상태에서 받아오면 됩니다
  const focusTime = Number(timerSetting.focusTime ?? 10); // 분
  const restTime = Number(timerSetting.restTime ?? 5); // 분
  const routineCnt = Number(timerSetting.routineCnt ?? 3);

  const [phase, setPhase] = useState<Phase>("focus");
  const [routine, setRoutine] = useState(1);
  const [time, setTime] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [modalPortalInfo, setModalPortalInfo] = useAtom(modalPortalAtom);

  // 타이머 동작
  useEffect(() => {
    if (!isRunning || phase === "done") return;

    if (time === 0) {
      if (phase === "focus") {
        setPhase("rest");
        setTime(restTime * 60);
      } else if (phase === "rest") {
        if (routine < routineCnt) {
          setRoutine((r) => r + 1);
          setPhase("focus");
          setTime(focusTime * 60);
        } else {
          setPhase("done");
          setIsRunning(false);
        }
      }
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, time, phase, routine, routineCnt, focusTime, restTime]);

  // 시작/일시정지 버튼
  const handleStartPause = () => {
    if (!isRunning && phase === "done") {
      // 완료 후 재시작 시 초기화
      setRoutine(1);
      setPhase("focus");
      setTime(focusTime * 60);
    }
    setIsRunning((prev) => !prev);
  };

  // 초기화 버튼
  const handleReset = () => {
    setIsRunning(false);
    setRoutine(1);
    setPhase("focus");
    setTime(focusTime * 60);
  };

  const handleOpenSettingBox = () =>
    setModalPortalInfo({ ...modalPortalInfo, state: true, type: "settingBox" });

  // 남은 루틴 표시
  const routineText =
    phase === "done"
      ? "모든 루틴 완료!"
      : `진행중: ${routine} / ${routineCnt} (${
          phase === "focus" ? "집중" : "휴식"
        })`;

  return (
    <div className={styles.container}>
      <div className={cn("flexColumn gap-24", styles.timer)}>
        <span className={cn("flexCenter", styles.completedText)}>
          {routineText}
          <Image width={24} height={24} src={Tomo} alt="" />
        </span>
        <div className={cn("flexCenter gap-16", styles.time)}>
          <span>{formatTime(time)[0]}</span>
          <span>{formatTime(time)[1]}</span>
          <span>:</span>
          <span>{formatTime(time)[3]}</span>
          <span>{formatTime(time)[4]}</span>
        </div>
        <div className={styles.controls}>
          <button onClick={handleStartPause} className={styles.button}>
            {isRunning ? "일시정지" : phase === "done" ? "재시작" : "시작"}
          </button>
          <button onClick={handleReset} className={styles.button}>
            초기화
          </button>
          <button onClick={handleOpenSettingBox} className={styles.button}>
            설정
          </button>
        </div>
      </div>
      {modalPortalInfo.type === "settingBox" && <SettingBox />}
      <div id="modal" />
    </div>
  );
};

export default DashboardPage;

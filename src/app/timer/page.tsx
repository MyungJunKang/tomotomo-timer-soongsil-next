"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";
import { useAtom } from "jotai";
import { modalPortalAtom } from "src/states/modal";
import { timerSettingAtom } from "src/states/timer";
import Tomo from "../../assets/tomo.png";
import { Button, Select } from "antd";
import { SetTimerBox } from "./_components/SetTimerBox";
import { useGetTimerHistoryListQuery } from "src/query/TimerQuery";
import { useSetTimerRecordMutation } from "src/query/TimerMutation";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

type Phase = "focus" | "rest" | "done";

const FOCUS_AUDIO = new Audio("/focus.wav");
const REST_AUDIO = new Audio("/rest.wav");
const DONE_AUDIO = new Audio("/done.wav");
FOCUS_AUDIO.volume = 0.8;
REST_AUDIO.volume = 0.8;
DONE_AUDIO.volume = 0.8;

const TimerPage = () => {
  const [timerSetting, setTimerSetting] = useAtom(timerSettingAtom);
  const focusTime = Number(timerSetting.focusTime ?? 0);
  const restTime = Number(timerSetting.restTime ?? 0);
  const routineCnt = Number(timerSetting.routineCnt ?? 0);

  const [phase, setPhase] = useState<Phase>("focus");
  const [routine, setRoutine] = useState(1);

  const [time, setTime] = useState(focusTime > 0 ? focusTime * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);

  const isTimerActive = focusTime > 0 && restTime > 0 && routineCnt > 0;

  const [modalPortalInfo, setModalPortalInfo] = useAtom(modalPortalAtom);

  const setTimerRecordMutation = useSetTimerRecordMutation();

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    let previousTime = time;

    const tick = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(previousTime - elapsed, 0);

      setTime(remaining);

      if (remaining > 0 && isRunning) {
        animationFrameId = requestAnimationFrame(tick);
      }

      if (remaining === 0 && isRunning) {
        if (phase === "focus") {
          REST_AUDIO.play();
          setPhase("rest");
          setTime(restTime * 60);
        } else if (phase === "rest") {
          if (routine < routineCnt) {
            setTimerRecordMutation.mutate(
              {
                timerId: timerSetting.id,
                body: {
                  actualFocusTime: focusTime,
                  actualBreakTime: restTime,
                },
              },
              {
                onSuccess: () => {
                  FOCUS_AUDIO.play();
                  setRoutine((prev) => prev + 1);
                  setPhase("focus");
                  setTime(focusTime * 60);
                },
              }
            );
          } else {
            setTimerRecordMutation.mutate(
              {
                timerId: timerSetting.id,
                body: {
                  actualFocusTime: focusTime,
                  actualBreakTime: restTime,
                },
              },
              {
                onSuccess: () => {
                  DONE_AUDIO.play();
                  setRoutine((prev) => prev + 1);
                  setPhase("done");
                  setIsRunning(false);
                },
              }
            );
          }
        }
      }
    };

    if (isRunning && time > 0) {
      previousTime = time;
      startTime = Date.now();
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    isRunning,
    phase,
    routine,
    routineCnt,
    focusTime,
    restTime,
    timerSetting.id,
    time,
  ]);

  useEffect(() => {
    setRoutine(1);
    setPhase("focus");
    setTime(focusTime > 0 ? focusTime * 60 : 0);
    setIsRunning(false);
  }, [focusTime, restTime, routineCnt]);

  const handleStartPause = () => {
    if (focusTime === 0 || restTime === 0 || routineCnt === 0) {
      alert("집중 시간, 휴식 시간, 반복 횟수를 모두 설정해 주세요.");
      return;
    }
    if (!isRunning && phase === "done") {
      setRoutine(1);
      setPhase("focus");
      setTime(focusTime * 60);
    }
    FOCUS_AUDIO.play();
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRoutine(1);
    setPhase("focus");
    setTime(focusTime * 60);
  };

  const handleOpenSetTimerBox = () =>
    setModalPortalInfo({
      ...modalPortalInfo,
      state: true,
      type: "setTimerBox",
    });

  const routineText =
    phase === "done"
      ? "모든 루틴 완료!"
      : `진행중 ${routine} / ${routineCnt} (${
          phase === "focus" ? "집중" : "휴식"
        })`;

  const { data: timerHistoryList } = useGetTimerHistoryListQuery();

  return (
    <div className={cn("flexCenter", styles.wrapper)}>
      <div className={cn("flexColumn gap-24", styles.timer)}>
        <div className={cn("flexCenter", styles.completedText)}>
          {isTimerActive && (
            <>
              {routineText}
              {[...Array(routine - 1)].map((_, idx) => (
                <Image key={idx} width={24} height={24} src={Tomo} alt="" />
              ))}
            </>
          )}
        </div>

        <div className={cn("flexCenter gap-16", styles.time)}>
          <span>{formatTime(time)[0]}</span>
          <span>{formatTime(time)[1]}</span>
          <span>:</span>
          <span>{formatTime(time)[3]}</span>
          <span>{formatTime(time)[4]}</span>
        </div>
        {timerHistoryList ? (
          <div className="flexCenter gap-16">
            <Select
              style={{ width: "100%", textAlign: "left" }}
              placeholder="타이머를 선택하세요."
              options={timerHistoryList.map((timerHistory) => ({
                value: timerHistory.id,
                label: timerHistory.taskName,
              }))}
              onChange={(value) => {
                if (value) {
                  const targetTimerHistory = timerHistoryList.find(
                    (f) => f.id === value
                  );
                  if (targetTimerHistory) {
                    const {
                      id,
                      taskName,
                      setFocusTime,
                      setBreakTime,
                      routineCnt,
                    } = targetTimerHistory;
                    setTimerSetting({
                      id: id,
                      title: taskName,
                      focusTime: setFocusTime,
                      restTime: setBreakTime,
                      routineCnt: routineCnt,
                    });
                  }
                }
              }}
            />
            <Button
              style={{ width: 100 }}
              onClick={() => handleOpenSetTimerBox()}
            >
              타이머 생성
            </Button>
          </div>
        ) : (
          <div style={{ width: 260, height: 32 }} />
        )}
        <div className={styles.controls}>
          <Button
            style={{ width: 100 }}
            color="default"
            variant="solid"
            onClick={() => handleStartPause()}
          >
            {isRunning ? "일시정지" : phase === "done" ? "재시작" : "시작"}
          </Button>
          <Button
            style={{ width: 100 }}
            color="default"
            variant="solid"
            onClick={() => handleReset()}
          >
            초기화
          </Button>
        </div>
      </div>
      {modalPortalInfo.type === "setTimerBox" && <SetTimerBox />}
      <div id="modal" />
    </div>
  );
};

export default TimerPage;

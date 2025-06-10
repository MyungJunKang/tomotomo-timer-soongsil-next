import { ModalPortal } from "src/components/ModalPortal";
import styles from "./SetTimerBox.module.scss";
import cn from "classnames";
import { ChangeEvent, useState } from "react";
import { Button, Input } from "antd";
import { useAtom, useSetAtom } from "jotai";
import { modalPortalAtom } from "src/states/modal";
import { timerSettingAtom } from "src/states/timer";
import { useSetTimerMutation } from "src/query/TimerMutation";

type TimerResponseType = {
  id: number;
  taskName: string;
  setFocusTime: string;
  setBreakTime: string;
  routineCnt: number;
  totalTime: string;
  createDate: string;
  formattedTotalTime: string;
};

export const SetTimerBox = () => {
  const [modalPortalInfo, setModalPortalInfo] = useAtom(modalPortalAtom);
  const [taskInfo, setTaskInfo] = useState<{
    taskName: string;
    routineCnt: number;
    mode: string;
    setFocusTime: number;
    setBreakTime: number;
  }>({
    taskName: "",
    routineCnt: 0,
    mode: "timer",
    setFocusTime: 0,
    setBreakTime: 0,
  });
  const setTimerSetting = useSetAtom(timerSettingAtom);

  const updateTimerSettingEvent = (
    e: ChangeEvent<HTMLInputElement>,
    key: "taskName" | "setFocusTime" | "setBreakTime" | "routineCnt"
  ) => {
    setTaskInfo({ ...taskInfo, [key]: e.target.value });
  };

  const setTimerMutation = useSetTimerMutation();

  const handleSetTaskEvent = () => {
    const body = {
      setFocusTime: `PT${taskInfo.setFocusTime}M`,
      setBreakTime: `PT${taskInfo.setBreakTime}M`,
      routineCnt: taskInfo.routineCnt,
      mode: "timer",
      taskName: taskInfo.taskName,
    };
    setTimerMutation.mutate(body, {
      onSuccess: (res) => {
        {
          const data: TimerResponseType = res.data.data;
          setTimerSetting({
            id: data.id,
            title: data.taskName,
            focusTime: Number(taskInfo.setFocusTime),
            restTime: Number(taskInfo.setBreakTime),
            routineCnt: data.routineCnt,
          });
          handleCloseEvent();
        }
      },
    });
  };

  const handleCloseEvent = () =>
    setModalPortalInfo({ ...modalPortalInfo, state: false, type: "" });

  return (
    <ModalPortal>
      <div className={styles.wrapper}>
        <div className={cn("fs-18 fw-600", styles.titleBox)}>타이머 생성</div>
        <div className="flexColumn gap-24">
          <div className="flexColumn gap-6">
            <span className={styles.sub}>타이머 이름</span>
            <Input
              type="text"
              value={taskInfo.taskName}
              onChange={(e) =>
                setTaskInfo({ ...taskInfo, taskName: e.target.value })
              }
              size="middle"
              placeholder="타이머 이름을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>집중 시간</span>
            <Input
              type="number"
              value={taskInfo.setFocusTime}
              suffix="분"
              onChange={(e) => updateTimerSettingEvent(e, "setFocusTime")}
              size="middle"
              placeholder="집중 시간을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>휴식 시간</span>
            <Input
              type="number"
              suffix="분"
              value={taskInfo.setBreakTime}
              onChange={(e) => updateTimerSettingEvent(e, "setBreakTime")}
              size="middle"
              placeholder="휴식 시간을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>반복 횟수</span>
            <Input
              type="number"
              value={taskInfo.routineCnt}
              onChange={(e) =>
                setTaskInfo({ ...taskInfo, routineCnt: Number(e.target.value) })
              }
              size="middle"
              placeholder="반복 횟수를 입력해주세요."
            />
          </div>
        </div>
        <div className={cn("flexCenter gap-8", styles.btnBox)}>
          <Button
            onClick={handleSetTaskEvent}
            disabled={
              taskInfo.taskName.length === 0 ||
              taskInfo.setBreakTime === 0 ||
              taskInfo.setFocusTime === 0 ||
              taskInfo.routineCnt === 0
            }
            type="primary"
            size="large"
          >
            타이머 생성
          </Button>
          <Button onClick={handleCloseEvent} type="default" size="large">
            닫기
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
};

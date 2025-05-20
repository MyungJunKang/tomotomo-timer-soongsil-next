import { ModalPortal } from "src/app/components/ModalPortal";
import styles from "./SettingBox.module.scss";
import cn from "classnames";
import { Button, Input } from "antd";
import { useAtom } from "jotai";
import { timerSettingAtom } from "src/states/timer";
import { ChangeEvent } from "react";
import { modalPortalAtom } from "src/states/modal";
export const SettingBox = () => {
  const [modalPortalInfo, setModalPortalInfo] = useAtom(modalPortalAtom);
  const [timerSetting, setTimerSetting] = useAtom(timerSettingAtom);

  const updateTimerSettingEvent = (
    e: ChangeEvent<HTMLInputElement>,
    key: "title" | "focusTime" | "restTime" | "routineCnt"
  ) => {
    setTimerSetting({ ...timerSetting, [key]: e.target.value });
  };

  const handleCloseEvent = () =>
    setModalPortalInfo({ ...modalPortalInfo, state: false, type: "" });

  const setTimerEvent = () => {
    handleCloseEvent();
  };

  return (
    <ModalPortal>
      <div className={styles.wrapper}>
        <div className={cn("fs-18 fw-600", styles.titleBox)}>타이머 설정</div>
        <div className="flexColumn gap-24">
          <div className="flexColumn gap-6">
            <span className={styles.sub}>제목</span>
            <Input
              type="text"
              value={timerSetting.title}
              onChange={(e) => updateTimerSettingEvent(e, "title")}
              size="middle"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>집중 시간</span>
            <Input
              type="number"
              value={timerSetting.focusTime}
              suffix="분"
              onChange={(e) => updateTimerSettingEvent(e, "focusTime")}
              size="middle"
              placeholder="집중 시간을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>휴식 시간</span>
            <Input
              type="number"
              suffix="분"
              value={timerSetting.restTime}
              onChange={(e) => updateTimerSettingEvent(e, "restTime")}
              size="middle"
              placeholder="휴식 시간을 입력해주세요."
            />
          </div>
          <div className="flexColumn gap-6">
            <span className={styles.sub}>반복 횟수</span>
            <Input
              type="number"
              value={timerSetting.routineCnt}
              suffix="회"
              onChange={(e) => updateTimerSettingEvent(e, "routineCnt")}
              size="middle"
              placeholder="반복횟수를 입력해주세요."
            />
          </div>
        </div>
        <div className={cn("flexCenter gap-8", styles.btnBox)}>
          <Button onClick={setTimerEvent} type="primary" size="large">
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

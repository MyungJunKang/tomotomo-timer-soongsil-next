import { TimerRecordType } from "src/types/TimerTypes";
import styles from "./TimerBox.module.scss";
import cn from "classnames";
import { formatMinutesToHourMinute } from "src/utils/funcs/formatMinutesToHourMinute";
import dayjs from "dayjs";

interface Props {
  timerRecordList: TimerRecordType[];
}

const TODAY = dayjs();

export const TodayFocusTimeBox = ({ timerRecordList }: Props) => {
  const todayFocusTime = timerRecordList
    .filter((timerRecord) => dayjs(timerRecord.createDate).isSame(TODAY, "day"))
    .reduce((acc, cur) => acc + cur.totalTime, 0);

  return (
    <div className={cn("flexJustifyBetween flexColumn", styles.wrapper)}>
      <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
        오늘의 집중 시간
      </div>
      <div className="flexJustifyEnd fw-600 fs-18">
        {formatMinutesToHourMinute(todayFocusTime)}
      </div>
    </div>
  );
};

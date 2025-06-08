import { TimerRecordType } from "src/types/TimerTypes";
import styles from "./TimerBox.module.scss";
import cn from "classnames";
import { formatMinutesToHourMinute } from "src/utils/funcs/formatMinutesToHourMinute";

interface Props {
  timerRecordList: TimerRecordType[];
}

export const TotalFocusTimeBox = ({ timerRecordList }: Props) => {
  const totalFocusTime = timerRecordList.reduce(
    (acc, cur) => acc + cur.totalTime,
    0
  );

  return (
    <div className={cn("flexJustifyBetween flexColumn", styles.wrapper)}>
      <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
        총 집중 시간 (최근 1개월)
      </div>
      <div className="flexJustifyEnd fw-600 fs-18">
        {formatMinutesToHourMinute(totalFocusTime)}
      </div>
    </div>
  );
};

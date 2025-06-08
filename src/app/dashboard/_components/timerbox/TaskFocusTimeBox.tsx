import { TimerRecordType } from "src/types/TimerTypes";
import styles from "./TimerBox.module.scss";
import cn from "classnames";
import { formatMinutesToHourMinute } from "src/utils/funcs/formatMinutesToHourMinute";

interface Props {
  timerRecordList: TimerRecordType[];
}

const MEDAL_ICON_LIST = ["🥇", "🥈", "🥉"];

export const TaskFocusTimeBox = ({ timerRecordList }: Props) => {
  const taskMap = new Map<number, { taskName: string; totalMinutes: number }>();

  timerRecordList.forEach((timerRecord) => {
    const { id, taskName, totalTime } = timerRecord;
    const minutes = totalTime;
    if (taskMap.has(id)) {
      const prev = taskMap.get(id)!;
      taskMap.set(id, {
        taskName,
        totalMinutes: prev.totalMinutes + minutes,
      });
    } else {
      taskMap.set(id, { taskName, totalMinutes: minutes });
    }
  });

  const taskSummaryList = Array.from(taskMap.values());
  const sortedTaskSummary = [...taskSummaryList]
    .sort((a, b) => b.totalMinutes - a.totalMinutes)
    .slice(0, 3);

  return (
    <div className={cn("flexJustifyBetween flexColumn", styles.wrapper)}>
      <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
        타이머별 집중 시간 순위
      </div>
      <div className="flexJustifyEnd">
        <div className="flexColumn gap-8">
          {sortedTaskSummary.map(({ taskName, totalMinutes }, index) => (
            <div key={index} className={cn("flexBetweenCenter gap-16")}>
              <span className={cn(styles.rank)}>
                {MEDAL_ICON_LIST[index]} {index + 1}등
              </span>
              <span>{taskName}</span>
              <span>{formatMinutesToHourMinute(totalMinutes)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

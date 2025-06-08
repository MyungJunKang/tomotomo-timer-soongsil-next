"use client";

import { useGetTimerRecordListQuery } from "src/query/TimerQuery";
import { TotalFocusTimeBox } from "./_components/timerbox/TotalFocusTimeBox";
import styles from "./page.module.scss";
import cn from "classnames";
import dayjs from "dayjs";
import { TodayFocusTimeBox } from "./_components/timerbox/TodayFocusTimeBox";
import { TaskFocusTimeBox } from "./_components/timerbox/TaskFocusTimeBox";
import { HeatmapBox } from "./_components/graphbox/HeatmapBox";
import { DateType } from "src/types/CommonTypes";
import { useAtomValue } from "jotai";
import { layoutPortalAtom } from "src/states/modal";
import { ChartBox } from "./_components/graphbox/ChartBox";

const DashboardPage = () => {
  const layoutPortalInfo = useAtomValue(layoutPortalAtom);
  const date: DateType = {
    start: dayjs().subtract(6, "month"),
    end: dayjs(),
  };
  const { start, end } = date;
  const { data: timerRecordList, isLoading } = useGetTimerRecordListQuery({
    startDate: start.format("YYYY-MM-DD"),
    endDate: end.format("YYYY-MM-DD"),
  });

  return (
    <div className={cn("gap-16", styles.wrapper)}>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          {timerRecordList && (
            <>
              <div className={cn("gap-16", styles.timerBox)}>
                <TotalFocusTimeBox timerRecordList={timerRecordList} />
                <TodayFocusTimeBox timerRecordList={timerRecordList} />
                <TaskFocusTimeBox timerRecordList={timerRecordList} />
              </div>
              <div className={cn("gap-16", styles.graphBox)}>
                <HeatmapBox date={date} timerRecordList={timerRecordList} />
                <ChartBox timerRecordList={timerRecordList} />
              </div>
            </>
          )}
        </>
      )}
      <div
        id="layoutportal"
        className={styles.layoutPortal}
        style={{
          top: layoutPortalInfo.top,
          left: layoutPortalInfo.left,
          zIndex: layoutPortalInfo.zIndex,
        }}
      ></div>
    </div>
  );
};

export default DashboardPage;

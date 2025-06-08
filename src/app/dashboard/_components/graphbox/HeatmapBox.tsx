import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import styles from "./HeatmapBox.module.scss";
import cn from "classnames";
import { DateType } from "src/types/CommonTypes";
import dayjs from "dayjs";
import { TimerRecordType } from "src/types/TimerTypes";
import { useAtom } from "jotai";
import { layoutPortalAtom } from "src/states/modal";
import { Tooltip } from "./heatmapbox/Tooltip";
import { useState } from "react";

interface Props {
  date: DateType;
  timerRecordList: TimerRecordType[];
}

const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`) as [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const WEEKDAY_LABELS: [string, string, string, string, string, string, string] =
  ["일", "월", "화", "수", "목", "금", "토"] as const;

export const HeatmapBox = ({ date, timerRecordList }: Props) => {
  const [layoutPortalInfo, setLayoutPortalInfo] = useAtom(layoutPortalAtom);
  const { start, end } = date;

  const heatmapDatas = Object.values(
    timerRecordList.reduce((acc, timerRecord) => {
      const date = dayjs(timerRecord.createDate).format("YYYY-MM-DD");

      if (!acc[date]) {
        acc[date] = { date, count: 0 };
      }

      acc[date].count += timerRecord.totalTime;

      return acc;
    }, {} as Record<string, { date: string; count: number }>)
  );

  const [tooltipData, setTooltipData] = useState<string>("");

  const maxCount = Math.max(...heatmapDatas.map((v) => v.count ?? 0));
  const step = maxCount / 4;

  const getTooltipDataAttrs = (
    value: { date?: string; count?: number } | undefined
  ): { [key: string]: string } => {
    if (!value || !value.date) {
      return {};
    }

    return {
      tooltip: `${dayjs(value.date).format("YYYY년 M월 D일")}.${
        value.count ?? 0
      }`,
    };
  };

  return (
    <div className={cn("flexColumn flexJustifyBetween gap-16", styles.wrapper)}>
      <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
        집중 시간 분포
      </div>
      <div>
        <ReactCalendarHeatmap
          startDate={start.format("YYYY-MM-DD")}
          endDate={end.format("YYYY-MM-DD")}
          monthLabels={MONTH_LABELS}
          weekdayLabels={WEEKDAY_LABELS}
          showWeekdayLabels={true}
          values={heatmapDatas}
          onMouseOver={(e) => {
            const rect: DOMRect = e.currentTarget.getBoundingClientRect();
            const tooltipData = e.currentTarget.getAttribute("tooltip");
            if (tooltipData) {
              setLayoutPortalInfo({
                ...layoutPortalInfo,
                type: "tooltip",
                state: true,
                top: rect.top,
                left: rect.left + 24,
              });
              setTooltipData(tooltipData);
            }
          }}
          onMouseLeave={() => {
            setLayoutPortalInfo({
              ...layoutPortalInfo,
              type: "",
              state: false,
            });
            setTooltipData("");
          }}
          tooltipDataAttrs={(value) => getTooltipDataAttrs(value)}
          classForValue={(value) => {
            if (!value || !value.count) return "color-empty";
            const count = value.count;
            if (count <= step) return "color-scale-1";
            if (count <= step * 2) return "color-scale-2";
            if (count <= step * 3) return "color-scale-3";
            return "color-scale-4";
          }}
        />
      </div>

      {layoutPortalInfo.type === "tooltip" &&
        layoutPortalInfo.state &&
        tooltipData && <Tooltip tooltipData={tooltipData} />}
    </div>
  );
};

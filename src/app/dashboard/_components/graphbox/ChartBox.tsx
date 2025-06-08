import styles from "./ChartBox.module.scss";
import cn from "classnames";
import EChartsReact from "echarts-for-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EChart } from "src/components/Chart";
import { TimerRecordType } from "src/types/TimerTypes";
import dayjs from "dayjs";

interface Props {
  timerRecordList: TimerRecordType[];
}

type SeriesType = {
  name: string;
  type: "line";
  data: number[];
  smooth: true;
  lineStyle: {
    type: "solid" | "dashed";
  };
  yAxisIndex: number;
};

export const ChartBox = ({ timerRecordList }: Props) => {
  const chartRef = useRef<EChartsReact | null>(null);
  const [option, setOption] = useState({});

  const processChartData = (timerRecordList: TimerRecordType[]) => {
    const seriesMap: Record<
      number,
      {
        taskName: string;
        dates: string[];
        completedRoutines: number[];
        totalTimes: number[];
      }
    > = {};

    timerRecordList.forEach((record) => {
      if (record.totalTime === 0) return;
      if (record.completedRoutineCnt === 0) return;

      const id = record.id;
      const date = dayjs(record.createDate).format("M월 D일");

      if (!seriesMap[id]) {
        seriesMap[id] = {
          taskName: record.taskName,
          dates: [],
          completedRoutines: [],
          totalTimes: [],
        };
      }

      seriesMap[id].dates.push(date);
      seriesMap[id].completedRoutines.push(record.completedRoutineCnt);
      seriesMap[id].totalTimes.push(record.totalTime);
    });

    for (const [id, entry] of Object.entries(seriesMap)) {
      const sum =
        entry.completedRoutines.reduce((a, b) => a + b, 0) +
        entry.totalTimes.reduce((a, b) => a + b, 0);
      if (sum === 0) {
        delete seriesMap[+id];
      }
    }

    return seriesMap;
  };

  const getChartInfo = useCallback(() => {
    const seriesMap = processChartData(timerRecordList);

    const allDatesSet = new Set<string>();
    Object.values(seriesMap).forEach(({ dates }) =>
      dates.forEach((d) => allDatesSet.add(d))
    );
    const sortedDates = Array.from(allDatesSet).sort();

    const series: SeriesType[] = [];

    Object.entries(seriesMap).forEach(
      ([, { taskName, dates, completedRoutines, totalTimes }]) => {
        const dateToIndex = Object.fromEntries(dates.map((d, i) => [d, i]));

        const completedRoutineSeries = sortedDates.map((date) =>
          dateToIndex[date] !== undefined
            ? completedRoutines[dateToIndex[date]]
            : 0
        );
        const totalTimeSeries = sortedDates.map((date) =>
          dateToIndex[date] !== undefined ? totalTimes[dateToIndex[date]] : 0
        );

        series.push(
          {
            name: `${taskName} - 시간`,
            type: "line",
            data: totalTimeSeries,
            smooth: true,
            yAxisIndex: 0,
            lineStyle: {
              type: "solid",
            },
          },
          {
            name: `${taskName} - 루틴`,
            type: "line",
            data: completedRoutineSeries,
            smooth: true,
            yAxisIndex: 1,
            lineStyle: {
              type: "dashed",
            },
          }
        );
      }
    );

    setOption({
      textStyle: {
        fontFamily: "'Gmarket Sans', sans-serif",
        fontSize: 12,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "10%",
        left: "4%",
        right: "4%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sortedDates,
        axisLabel: {
          fontFamily: "'Gmarket Sans', sans-serif",
        },
      },
      yAxis: [
        {
          type: "value",
          name: "집중 시간",
          position: "left",
          axisLabel: {
            fontFamily: "'Gmarket Sans', sans-serif",
          },
        },
        {
          type: "value",
          name: "루틴 횟수",
          position: "right",
          splitLine: {
            show: false,
          },
          axisLabel: {
            fontFamily: "'Gmarket Sans', sans-serif",
          },
        },
      ],
      series,
    });
  }, [timerRecordList]);

  useEffect(() => {
    getChartInfo();
  }, [getChartInfo]);

  return (
    <div className={cn("flexColumn flexJustifyBetween gap-16", styles.wrapper)}>
      <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
        집중 차트
      </div>
      <EChart chartRef={chartRef} options={option} />
    </div>
  );
};

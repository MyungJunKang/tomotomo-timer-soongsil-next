import ECharts from "echarts-for-react";
import EChartsReact from "echarts-for-react";
import { MutableRefObject } from "react";

interface Props {
  options: any;
  chartRef?:
    | MutableRefObject<ECharts | null>
    | MutableRefObject<EChartsReact | null>
    | any;
}

export const EChart = ({ options, chartRef }: Props) => {
  return (
    <ECharts
      ref={chartRef}
      option={options}
      opts={{ renderer: "svg" }}
      style={{ height: "100%" }}
      notMerge={true}
    />
  );
};

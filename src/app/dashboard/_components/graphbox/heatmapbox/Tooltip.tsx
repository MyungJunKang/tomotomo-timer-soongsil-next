import { LayoutPortal } from "src/components/LayoutPortal";
import styles from "./Tooltip.module.scss";
import cn from "classnames";

interface Props {
  tooltipData: string;
}

export const Tooltip = ({ tooltipData }: Props) => {
  const [date, focusTime] = tooltipData.split(".");
  return (
    <LayoutPortal autoClose={true}>
      <div className={cn("flexColumn gap-8", styles.wrapper)}>
        <span>{date}</span>
        <div className="flexJustifyEnd">집중 시간 - {focusTime}분</div>
      </div>
    </LayoutPortal>
  );
};

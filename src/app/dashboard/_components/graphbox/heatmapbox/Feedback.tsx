import { useEffect, useState } from "react";
import { LayoutPortal } from "src/components/LayoutPortal";
import { getTimerFeedback } from "src/services/TimerService";
import styles from "./Feedback.module.scss";
import cn from "classnames";
import { Spin } from "antd";

export const Feedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getTimerFeedback()
      .then((res) => {
        setFeedback(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setFeedback(
          "피드백을 불러오는 데 실패했습니다. 나중에 다시 시도해주세요."
        );
      });
  }, []);

  return (
    <LayoutPortal>
      <div className={cn("flexColumn gap-16", styles.wrapper)}>
        <div className={cn("fw-500 fs-16 flexAlignCenter", styles.titleBox)}>
          토모토모 피드백
        </div>
        <div className={styles.feedbackBox}>
          {isLoading ? (
            <div className={cn("flexCenter", styles.spinBox)}>
              <Spin size="large" />
            </div>
          ) : (
            <>{feedback}</>
          )}
        </div>
      </div>
    </LayoutPortal>
  );
};

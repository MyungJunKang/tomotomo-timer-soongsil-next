"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import Image from "next/image";

import Tomo from "../../assets/tomo.png";
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const DashboardPage = () => {
  const [time, setTime] = useState(1500); // 기본 25분
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(customMinutes * 60);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Math.max(0, parseInt(e.target.value) || 0);
    setCustomMinutes(minutes);
    setTime(minutes * 60);
    setIsRunning(false);
  };

  return (
    <div className={styles.container}>
      <div className={cn("flexColumn gap-24", styles.timer)}>
        <span className={cn("flexCenter", styles.completedText)}>
          오늘 완료한 집중 횟수 -{" "}
          <Image width={24} height={24} src={Tomo} alt="" />
        </span>
        <div className={cn("flexCenter gap-16", styles.time)}>
          <span>
            {formatTime(time)[0]}
            {formatTime(time)[1]}
          </span>
          <span>:</span>
          <span>
            {formatTime(time)[3]}
            {formatTime(time)[4]}
          </span>
        </div>
        <div className={styles.controls}>
          <input
            type="number"
            min="1"
            max="120"
            value={customMinutes}
            onChange={handleChange}
            className={styles.input}
          />
          <button onClick={handleStartPause} className={styles.button}>
            {isRunning ? "일시정지" : "시작"}
          </button>
          <button onClick={handleReset} className={styles.button}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

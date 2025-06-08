export function formatMinutesToHourMinute(totalMinutes: number): string {
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}시간 ${minutes}분`;
  } else {
    return `${totalMinutes}분`;
  }
}

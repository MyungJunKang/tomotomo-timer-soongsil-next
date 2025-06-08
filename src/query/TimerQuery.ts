import { useQuery } from "@tanstack/react-query";
import { getTimerHistory, getTimerRecord } from "src/services/TimerService";
import { TimerHistoryType, TimerRecordType } from "src/types/TimerTypes";

export const useGetTimerHistoryListQuery = () => {
  return useQuery<TimerHistoryType[]>({
    queryKey: ["useGetTimerHistoryListQuery"],
    queryFn: async () => {
      const res = await getTimerHistory();
      return res.data.data;
    },
  });
};

export const useGetTimerRecordListQuery = (params: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery<TimerRecordType[]>({
    queryKey: ["useGetTimerRecordListQuery", params],
    queryFn: async () => {
      const res = await getTimerRecord(params);
      return res.data.data;
    },
  });
};

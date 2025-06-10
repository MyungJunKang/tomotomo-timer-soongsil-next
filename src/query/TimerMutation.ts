import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTimer, setTimerRecord } from "src/services/TimerService";

export const useSetTimerRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setTimerRecord,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["useGetTimerHistoryListQuery"],
      });
      queryClient.refetchQueries({
        queryKey: ["useGetTimerRecordListQuery"],
      });
    },
  });
};

export const useSetTimerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setTimer,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["useGetTimerHistoryListQuery"],
      });
      queryClient.refetchQueries({
        queryKey: ["useGetTimerRecordListQuery"],
      });
    },
  });
};

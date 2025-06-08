import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTimerRecord } from "src/services/TimerService";

export const useSetTimerRecordMutation = () => {
  const queryClient = useQueryClient();
  const queryKeys = [
    "useGetTimerHistoryListQuery",
    "useGetTimerRecordListQuery",
  ];
  return useMutation({
    mutationFn: setTimerRecord,
    onSuccess: () =>
      queryKeys.forEach((queryKey) =>
        queryClient.refetchQueries({ queryKey: [queryKey] })
      ),
  });
};

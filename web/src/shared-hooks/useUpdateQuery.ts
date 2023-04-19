import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useUpdateQuery = () => {
  const client = useQueryClient();
  return useCallback(
    (key: string, fn: any) => {
      return client.setQueryData(key, fn as any);
    },
    [client]
  );
};

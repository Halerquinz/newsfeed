import { useCallback, useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useQueryClient } from "react-query";

export const usePrefetchQuery = () => {
  const { conn } = useContext(AuthContext);
  const client = useQueryClient();

  return useCallback(
    (key: string, fn: any) => {
      client.prefetchQuery(key, fn, { staleTime: 0 });
    },
    [conn, client]
  );
};

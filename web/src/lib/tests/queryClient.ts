import { QueryClient } from "react-query";
import { defaultQueryFn } from "./defaultQueryFn";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minute
      queryFn: defaultQueryFn as any,
    },
  },
});

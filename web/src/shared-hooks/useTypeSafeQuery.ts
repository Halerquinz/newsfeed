import { UseQueryOptions, useQuery } from "react-query";

type Keys = string | number | symbol;
type PaginatedKey<K extends Keys> = [K, ...(string | number | boolean)[]];
export const useTypeSafeQuery = <K extends Keys>(
  key: K | PaginatedKey<K>,
  otps: UseQueryOptions
) => {
  return useQuery({ queryKey: "key" });
};

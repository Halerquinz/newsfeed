import { useTokenStore } from "../../modules/auth/useTokenStore";
import { apiBaseUrl } from "./constants";
import fetch from "isomorphic-fetch";

export const defaultQueryFn = async ({ queryKey }: { queryKey: string }) => {
  const { token } = useTokenStore.getState();
  const res = await fetch(`${apiBaseUrl}${queryKey}`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(await res.text());
  }
  const data = await res.json();

  return data;
};

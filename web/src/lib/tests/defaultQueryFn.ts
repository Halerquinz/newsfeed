import { useTokenStore } from "../../modules/auth/useTokenStore";
import { apiBaseUrl } from "./constants";
import fetch from "isomorphic-fetch";

export type queryKey = Array<string | number | boolean> | string;

export const defaultQueryFn = async ({ queryKey }: { queryKey: queryKey }) => {
  const { token } = useTokenStore.getState();
  let headersRequest: {} = { authorization: `bearer ${token}` };
  let key = queryKey;

  if (queryKey.length > 1) {
    key = queryKey[0] as string;

    headersRequest = {
      authorization: `bearer ${token}`,
      cursor: queryKey[1],
      limit: queryKey[2],
    };
  }

  const res = await fetch(`${apiBaseUrl}${key}`, {
    headers: headersRequest,
  });

  if (res.status !== 200) {
    throw new Error(await res.text());
  }
  const data = await res.json();

  return data;
};

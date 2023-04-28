import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Data, PostDetail, UserWithFollowInfo } from "../../types/util-types";
import { isServer } from "../../lib/tests/isServer";
import { useTokenStore } from "../auth/useTokenStore";
import { apiBaseUrl } from "../../lib/tests/constants";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import fetch from "isomorphic-fetch";

export const useGetUserWithFollowInfo = () => {
  const { query } = useRouter();
  const { token } = useTokenStore();
  const { conn } = useContext(AuthContext);

  const { data, isLoading } = useQuery<Data<UserWithFollowInfo>>({
    queryKey: `/user/${query.id as string}`,
    enabled: typeof query.id === "string" && !!query.id && !!conn,
    refetchOnMount: "always",
    queryFn: async ({ queryKey }) => {
      console.log(conn?.user?.id);
      const res = await fetch(`${apiBaseUrl}${queryKey}`, {
        headers: {
          authorization: `beared ${token}`,
          currentUserId: conn?.user?.id,
        } as any,
      });

      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      const data = await res.json();

      return data;
    },
  });

  return {
    data,
    isLoading,
  };
};

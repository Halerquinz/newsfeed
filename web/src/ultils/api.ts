import { useContext } from "react";
import { apiBaseUrl } from "../lib/tests/constants";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { UserWithFollowInfo } from "../types/util-types";
import { AuthContext } from "../modules/auth/AuthProvider";
import fetch from "isomorphic-fetch";

export const updateUserProfile = async (data: UserWithFollowInfo) => {
  const { token } = useTokenStore.getState();
  const { conn } = useContext(AuthContext);
  console.log(conn);
  const res = await fetch(`${apiBaseUrl}/user/update/${conn?.user?.id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return await res.json();
};

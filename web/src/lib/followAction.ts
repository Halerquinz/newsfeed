import { useCallback } from "react";
import { apiBaseUrl } from "./tests/constants";
import { useTokenStore } from "../modules/auth/useTokenStore";

// export const followAction = useCallback(async (userId: number) => {
//   const { token } = useTokenStore.getState();

//   const res = await fetch(`${apiBaseUrl}/follow/${userId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `beared ${token}`,
//     },
//   });
//   return await res.json();
// }, []);

export const followAction = () =>
  useCallback(async (userId: number) => {
    const { token } = useTokenStore.getState();

    const res = await fetch(`${apiBaseUrl}/follow/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `beared ${token}`,
      },
    });
    return await res.json();
  }, []);

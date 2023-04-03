import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useTokenStore } from "./useTokenStore";
import { AuthContext } from "./AuthProvider";

export const useVerifyLoggedIn = () => {
  const { asPath, replace } = useRouter();
  const hasToken = useTokenStore((state) => !!state.token);
  useEffect(() => {
    if (!hasToken) {
      replace(`/`);
    }
  }, [asPath, hasToken]);

  return hasToken;
};

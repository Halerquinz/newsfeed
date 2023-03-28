import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "./useTokenStore";

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

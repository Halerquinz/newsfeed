import { create } from "zustand";
import { combine } from "zustand/middleware";
import { isServer } from "../../lib/tests/isServer";

const tokenKey = "token";

const getDefaultValue = () => {
  if (!isServer) {
    return {
      token: localStorage.getItem(tokenKey) || "",
    };
  }

  return {
    token: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValue(), (set) => ({
    setToken: (x: { token: string }) => {
      try {
        localStorage.setItem(tokenKey, x.token);
      } catch {}

      set(x);
    },
  }))
);

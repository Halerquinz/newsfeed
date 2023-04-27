import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTokenStore } from "./useTokenStore";
import { apiBaseUrl } from "../../lib/tests/constants";
import { UserWithFollowInfo } from "../../types/util-types";

type V = { user: UserWithFollowInfo | null } | null;

export const AuthContext = React.createContext<{
  conn: V;
  setConn: (u: V) => void;
}>({
  conn: null,
  setConn: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [conn, setConn] = useState<V>(null);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (!conn && token) {
      fetch(`${apiBaseUrl}/refresh_token`, {
        headers: {
          authorization: `beared ${token}`,
        },
      }).then((res) =>
        res.json().then((data) => {
          setConn({ user: data.data });
        })
      );
    }
    if (conn && !token) {
      setConn(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ conn, setConn }), [conn, setConn])}
    >
      {children}
    </AuthContext.Provider>
  );
};

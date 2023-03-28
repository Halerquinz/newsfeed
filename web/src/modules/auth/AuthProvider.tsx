import React, { useEffect, useMemo, useState } from "react";
import { useTokenStore } from "./useTokenStore";

type V = true | false;

export const AuthContext = React.createContext<{
  conn: V;
  setConn: (u: V) => void;
}>({
  conn: false,
  setConn: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [conn, setConn] = useState(false);
  const hasToken = useTokenStore((state) => !!state.token);

  useEffect(() => {
    if (!conn && hasToken) {
      setConn(true);
    }
  }, [hasToken]);

  // useEffect(() => {
  //   if (!conn) return;
  // }, []);

  return (
    <AuthContext.Provider value={useMemo(() => ({ conn, setConn }), [conn])}>
      {children}
    </AuthContext.Provider>
  );
};

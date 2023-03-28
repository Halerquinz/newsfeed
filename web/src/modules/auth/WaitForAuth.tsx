import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForAuthProps {
  children: React.ReactNode;
}

export const WaitForAuth: React.FC<WaitForAuthProps> = ({ children }) => {
  const { conn } = useContext(AuthContext);

  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!conn) {
    return <div className="flex">...loading</div>;
  }

  return <>{children}</>;
};

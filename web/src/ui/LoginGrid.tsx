import React from "react";

interface LoginGridProps {
  children: React.ReactNode;
}

export const LoginGrid: React.FC<LoginGridProps> = ({ children }) => {
  return (
    <div
      className="grid h-full w-full"
      style={{
        gridTemplateRows: "1fr auto 1fr",
      }}
    >
      {children}
    </div>
  );
};

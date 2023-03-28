import React from "react";

interface PanelProps {
  children: React.ReactNode;
}

export const GridPanel: React.FC<PanelProps> = ({ children }) => {
  return <div className={`flex w-full flex-1 flex-col`}>{children}</div>;
};

export const FixedGridPanel: React.FC<PanelProps> = ({ children }) => {
  return (
    <div className={`sticky top-0 flex h-screen flex-1 flex-col pt-5`}>
      {children}
    </div>
  );
};

import React from "react";
import { useScreenType } from "../shared-hooks/useScreenType";

interface DashboardGridProps {
  className?: string;
  children: React.ReactNode;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  className = "",
  children,
}) => {
  const screenType = useScreenType();

  let gridTemplateColumns = "235px 640px 325px";
  let myClassName = ``;

  if (screenType === "2-cols") {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === "fullscreen") {
    myClassName = "w-full px-3";
    gridTemplateColumns = "1fr";
  }

  return (
    <div
      id="main"
      className={`relative ${myClassName} ${className}`}
      style={{
        display: screenType === "fullscreen" ? "flex" : "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<DashboardGridProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex min-h-screen w-full justify-center bg-primary-900`}
      data-testid="main-grid"
    >
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  );
};

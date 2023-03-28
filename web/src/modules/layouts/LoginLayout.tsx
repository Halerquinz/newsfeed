import React from "react";
import { LoginGrid } from "../../ui/LoginGrid";
import { BottomPanel, TopPanel } from "./LoginPanels";

interface LoginLayoutProps {
  topPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
  children: React.ReactNode;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({
  topPanel = <div />,
  bottomPanel = <div />,
  children,
}) => {
  const middle = (
    <>
      <TopPanel>{topPanel}</TopPanel>
      {children}
      <BottomPanel>{bottomPanel}</BottomPanel>
    </>
  );

  return (
    <>
      <LoginGrid>{middle}</LoginGrid>
    </>
  );
};

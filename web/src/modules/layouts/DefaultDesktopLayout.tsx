import React from "react";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";
import { MainLayout } from "./MainLayout";

interface DefaultDesktopLayoutProps {
  children?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
  mobileHeader = undefined,
}) => {
  return (
    <MainLayout
      leftPanel={<AvailableUserController />}
      rightPanel={<ProfileBlockController />}
    >
      {children}
    </MainLayout>
  );
};

import React from "react";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";
import { MainLayout } from "./MainLayout";
import { ListUserChatController } from "../chat/ListUserChatController";

interface ChatLayoutProps {
  children?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  mobileHeader = undefined,
}) => {
  return (
    <MainLayout
      leftPanel={<ListUserChatController />}
      rightPanel={<ProfileBlockController />}
    >
      {children}
    </MainLayout>
  );
};

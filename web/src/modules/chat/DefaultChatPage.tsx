import React from "react";
import { PageComponent } from "../../types/PageComponent";
import NoSSR from "../../ultils/noSSR";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { UserProfileController } from "../user/UserProfileController";
import { ChatController } from "./ChatController";
import { ChatLayout } from "../layouts/ChatLayout";

interface ChatPageProps {}

export const DefaultChatPage: PageComponent<ChatPageProps> = ({}) => {
  return (
    <>
      {/* {user ? (
        <HeaderController description={user.about} title={user.username} />
      ) : (
        <HeaderController />
      )} */}
      <NoSSR>
        <ChatLayout>
          <MiddlePanel>
            <div
              className={`mb-7 flex w-full flex-1 flex-col rounded-8 bg-primary-800 p-7 text-primary-100 `}
            >
              <h3>Chọn tin nhắn</h3>
              <h4>
                Chọn từ các cuộc trò chuyện hiện có của bạn, hoặc bắt đầu một
                cuộc trò chuyện mới.
              </h4>
            </div>
          </MiddlePanel>
        </ChatLayout>
      </NoSSR>
    </>
  );
};

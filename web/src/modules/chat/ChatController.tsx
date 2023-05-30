import React from "react";
import { ChatRoom } from "./ChatRoom";

interface ChatController {}

export const ChatController: React.FC<ChatController> = ({}) => {
  // const data = useCurrentRoomFromCache();

  // if (!data || "error" in data) {
  //   return null;
  // }

  return <ChatRoom />;
};

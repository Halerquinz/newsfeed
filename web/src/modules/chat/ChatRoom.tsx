import React, { useContext, useEffect, useMemo, useState } from "react";
import { PostCommentInput } from "../post/comment/PostCommentInput";
import { PostCommentList } from "../post/comment/PostCommentList";
import { ChatContext } from "./ChatProvider";
import { AuthContext } from "../auth/AuthProvider";
import { useTokenStore } from "../auth/useTokenStore";
import { SocketContext, WebSocketProvider } from "./WebSocketProvider";
import { Conversation } from "./Conversation";
import { ChatBox } from "./ChatBox";

interface ChatRoomProps {
  // commentMap: CommentDetail[];
  // postId: number;
  // postCreatorId: number;
}

export type ReceiveMessage = {
  text: string;
  chatId: number;
  receiverId: number;
};

export const ChatRoom: React.FC<ChatRoomProps> = (
  {
    // commentMap,
    // postId,
    // postCreatorId,
  }
) => {
  const { ws } = useContext(SocketContext);
  const [chats, setChats] = useState([]);
  const user = useContext(AuthContext).conn?.user;
  const { token } = useTokenStore.getState();
  const { dispatch } = useContext(ChatContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState<any>();
  const [receiveMessage, setReceiveMessage] = useState<ReceiveMessage>();

  useEffect(() => {
    if (user) {
      ws.emit("new-user-add", user.id);
      ws.on("get-users", (users: any) => {
        console.log("user:", users);
        setOnlineUsers(users);
      });
    }
  }, [user]);

  useEffect(() => {
    if (sendMessage) {
      ws.emit("send-message", sendMessage);
      console.log("send-message:", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    ws.on("receive-message", (data: any) => {
      console.log("receive-message:", data);
      setReceiveMessage(data);
    });
  }, [receiveMessage]);

  useEffect(() => {
    const getChats = async () => {
      const response = await fetch(`http://localhost:5000/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${token}`,
        },
      });
      const dataApi = await response.json();
      setChats(dataApi.data);
    };
    if (user) {
      getChats();
    }
  }, [user]);
  console.log("chats:", chats);

  return (
    <div
      className={`flex h-full w-full flex-1 rounded-8 bg-primary-800 text-primary-100 md:bg-primary-800`}
    >
      <div className={`flex w-full flex-1 flex-col`}>
        {chats &&
          chats.map((chat: any, index) => (
            <div
              key={index}
              onClick={(e) =>
                dispatch({ type: "SET_CURRENT_CHAT", payload: chat })
              }
            >
              <Conversation
                userChat={
                  user?.id !== chat.user1Id ? chat.user1Id : chat.user2Id
                }
              />
            </div>
          ))}
        <div className="Right-side-chat" style={{ height: "100vh" }}>
          <div style={{ display: " flex", width: 200, alignSelf: "flex-end" }}>
            <div>icon1</div>
            <div>icon1</div>
          </div>
          <div>
            <ChatBox
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          </div>
        </div>
        {/* <PostCommentInput postId={postId} />
        <PostCommentList
          commentMap={commentMap}
          postCreatorId={postCreatorId}
        /> */}
      </div>
    </div>
  );
};

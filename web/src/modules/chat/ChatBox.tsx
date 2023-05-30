import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
// import InputEmoji from "react-input-emoji";
import { AuthContext } from "../auth/AuthProvider";
import { ChatContext } from "./ChatProvider";
import { useTokenStore } from "../../modules/auth/useTokenStore";
import { ReceiveMessage } from "./ChatRoom";

export interface ChatBoxProps {
  setSendMessage: React.Dispatch<any>;
  receiveMessage: ReceiveMessage | undefined;
}

type Message = {
  senderId: number;
  text: string;
  createdDate: string;
};

export const ChatBox: React.FC<ChatBoxProps> = ({
  setSendMessage,
  receiveMessage,
}) => {
  const { token } = useTokenStore.getState();
  const user = useContext(AuthContext).conn?.user;
  const { currentChat } = useContext(ChatContext);
  const [messages, setMessages] = useState<
    Array<Message | ReceiveMessage | null>
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef<HTMLDivElement>(null);

  // { text: 'a', chatId: 2, receiverId: 3 }

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId === currentChat?.id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(
        `http://localhost:5000/message/${currentChat?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bear ${token}`,
          },
        }
      );
      const dataApi = await response.json();

      setMessages(dataApi.data);
    };
    if (user) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e: React.SyntheticEvent<EventTarget>) => {
    const message = {
      text: newMessage,
      chatId: currentChat?.id,
    };
    e.preventDefault();
    const response = await fetch("http://localhost:5000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${token}`,
      },
      body: JSON.stringify(message),
    });
    const dataApi = await response.json();
    if (dataApi.status === "success") {
      setMessages([...messages, dataApi.data]);
      setNewMessage("");
    }

    const receiverId =
      currentChat?.user1Id === user?.id
        ? currentChat?.user2Id
        : currentChat?.user1Id;
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {currentChat && (
          <>
            <div className="chat-header">
              <div className="follower" style={{ paddingBottom: 8 }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <div className="online-dot"></div>
                    <img
                      src={
                        currentChat.user1Id === user?.id
                          ? currentChat.user2.profilePicture
                          : currentChat.user1.profilePicture
                      }
                      alt=""
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                  <div
                    className="name"
                    style={{
                      fontSize: "1.2rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span>
                      {currentChat.user1Id === user?.id
                        ? currentChat.user2.firstname
                        : currentChat.user1.firstname}{" "}
                      {currentChat.user1Id === user?.id
                        ? currentChat.user2.lastname
                        : currentChat.user1.lastname}
                    </span>
                    <span>online</span>
                  </div>
                </div>
              </div>
              <hr />
            </div>

            {/* message */}
            <div className="chat-body">
              {messages &&
                messages.map((message, index) => (
                  <div
                    ref={scroll}
                    key={index}
                    className={
                      message.senderId === user?.id ? "message own" : "message"
                    }
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "15px", fontWeight: 500 }}>
                        {message.text}
                      </span>
                      <span style={{ fontSize: "10px", opacity: 0.7 }}>
                        {format(message.createdDate)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="chat-sender">
              <div>+</div>
              {/* <InputEmoji value={newMessage} onChange={handleChange} /> */}
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

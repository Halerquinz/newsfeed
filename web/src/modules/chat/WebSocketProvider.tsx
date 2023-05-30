import React, { createContext, useReducer } from "react";
import socketIOClient from "socket.io-client";

const WS = "http://localhost:5000";
const ws = socketIOClient(WS);
export const SocketContext = createContext({ ws });

export type State = {
  ws: any;
};

export type Actions = {
  type: "SET_WS";
  payload: string;
};

export const socketReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_WS":
      return { ws: action.payload };
    default:
      return state;
  }
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(socketReducer, { ws });

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

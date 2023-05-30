import React, { useMemo, useReducer } from "react";

export const ChatContext = React.createContext<{
  currentChat: {
    id: number;
    user1Id: number;
    user2Id: number;
    user1: { firstname: string; lastname: string; profilePicture: string };
    user2: { firstname: string; lastname: string; profilePicture: string };
  } | null;
  dispatch: React.Dispatch<Actions>;
}>({ currentChat: null, dispatch: () => {} });

export type State = {
  currentChat: string | null;
};

export type Actions = {
  type: "SET_CURRENT_CHAT";
  payload: string;
};

export const chatReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "SET_CURRENT_CHAT":
      return { currentChat: action.payload };
    default:
      return state;
  }
};

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(chatReducer, {
    currentChat: null,
  });

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

import Link from "next/link";
import React, { useCallback, useContext } from "react";
import { SingleUser } from "./user/SingleUser";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { useMutation } from "react-query";
import { apiBaseUrl } from "../lib/tests/constants";
import { UserEditProfile } from "../types/util-types";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useRouter } from "next/router";

interface ChatUserType {
  firstname: string;
  lastname: string;
  profilePicture: string;
  username: string;
  id: number;
}

export const ChatUser: React.FC<ChatUserType> = ({
  firstname,
  lastname,
  profilePicture,
  username,
  id,
}) => {
  const { token } = useTokenStore.getState();
  const { conn } = useContext(AuthContext);
  const { push } = useRouter();

  const createChat = useCallback(async () => {
    const res = await fetch(`${apiBaseUrl}/chat/create-chat/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      method: "POST",
    });
    return await res.json();
  }, [conn]);

  const { mutateAsync } = useMutation(createChat);
  return (
    <div className="flex w-full py-3">
      <SingleUser size="sm" src={profilePicture} username={username} />
      <div className="ml-3 flex flex-col justify-center overflow-hidden">
        <div
          onClick={() => {
            // mutateAsync();
            push(`/chat/${id}`);
          }}
          className="cursor-pointer"
        >
          <h5 className="font-bold text-primary-100">{`${firstname} ${lastname}`}</h5>
        </div>
        <a className={`block truncate text-primary-300 hover:underline`}>
          {username}
        </a>
      </div>
    </div>
  );
};

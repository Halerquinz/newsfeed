import React from "react";
import { SingleUser } from "../../user/SingleUser";
import { User } from "../../../types/util-types";

export interface UserSearchResultProps {
  user: User;
  className?: string;
  onClick?: () => void;
}

export const UserSearchResult: React.FC<UserSearchResultProps> = ({
  user,
  className = "",
  onClick = () => undefined,
}) => {
  return (
    <div
      className={`flex w-full cursor-pointer rounded-8 px-4 py-3 hover:bg-primary-700 ${className}`}
      onClick={onClick}
    >
      <div className="mr-3 flex">
        <SingleUser src={user.profilePicture} size="md" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-primary-100">{`${user.firstname} ${user.lastname}`}</span>
        <span className="text-primary-300">@{user.username}</span>
      </div>
    </div>
  );
};

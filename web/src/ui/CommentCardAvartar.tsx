import React from "react";
import { SingleUser } from "./user/SingleUser";

interface CommentCardAvatarProps {
  avatar: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CommentCardAvatar: React.FC<CommentCardAvatarProps> = ({
  avatar,
  onClick,
}) => {
  return (
    <div className="relative flex" onClick={onClick}>
      <SingleUser
        className={"focus:outline-no-chrome cursor-pointer hover:opacity-75"}
        size="sm"
        src={avatar}
      />
    </div>
  );
};

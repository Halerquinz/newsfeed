import React from "react";
import { SingleUser } from "./user/SingleUser";

interface PostCardAvatarProps {
  avatar: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PostCardAvatar: React.FC<PostCardAvatarProps> = ({
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

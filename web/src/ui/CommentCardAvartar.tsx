import React from "react";
import { SingleUser } from "./user/SingleUser";

interface CommentCardAvatarProps {
  avatar: string;
}

export const CommentCardAvatar: React.FC<CommentCardAvatarProps> = ({
  avatar,
}) => {
  return (
    <div className="relative flex">
      <SingleUser
        className={"focus:outline-no-chrome"}
        size="sm"
        src={avatar}
      />
    </div>
  );
};

import React from "react";
import { SingleUser } from "./user/SingleUser";

interface PostCardAvatarProps {
  avatar: string;
}

export const PostCardAvatar: React.FC<PostCardAvatarProps> = ({ avatar }) => {
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

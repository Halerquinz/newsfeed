import React from "react";
import { CommentCardAvatar } from "./CommentCardAvartar";
import { CommentCardDetailUser } from "./CommentCardDetailUser";
import { CommentCardLeft } from "./CommentCardLeft";
import { CommentCardRight } from "./CommentCardRight";
import { CommentCardText } from "./CommentCardText";
import { convertTZ } from "../ultils/convertTZ";

interface CommentCardProps {
  profilePicture: string;
  username: string;
  createdDate: string;
  text: string;
  onClick?: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  createdDate,
  username,
  profilePicture,
  text,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full rounded-lg bg-primary-800 p-2 transition duration-200 ease-in-out hover:bg-primary-700"
    >
      <CommentCardLeft>
        {<CommentCardAvatar avatar={profilePicture} />}
      </CommentCardLeft>
      <CommentCardRight
        detail={
          <CommentCardDetailUser
            createdDate={convertTZ(createdDate)}
            username={username}
          />
        }
        text={<CommentCardText text={text} />}
      />
    </div>
  );
};

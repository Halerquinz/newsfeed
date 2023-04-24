import React, { ReactElement } from "react";

export interface CommentCardDetailUserProps {
  username: string;
  createdDate: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CommentCardDetailUser: React.FC<CommentCardDetailUserProps> = ({
  username,
  createdDate,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <span className="inline cursor-pointer truncate text-primary-300 hover:underline">
        {username}
      </span>
      <span className="ml-2 inline cursor-pointer truncate text-primary-300 hover:underline">
        {createdDate}
      </span>
    </div>
  );
};

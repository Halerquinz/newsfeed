import React, { ReactElement } from "react";

export interface CommentCardDetailUserProps {
  username: string;
  createdDate: string;
}

export const CommentCardDetailUser: React.FC<CommentCardDetailUserProps> = ({
  username,
  createdDate,
}) => {
  return (
    <>
      <span className="inline truncate text-primary-300 hover:underline">
        {username}
      </span>
      <span className="ml-2 inline truncate text-primary-300 hover:underline">
        {createdDate}
      </span>
    </>
  );
};

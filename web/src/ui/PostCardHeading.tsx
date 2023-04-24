import React, { ReactElement } from "react";

export interface PostCardHeadingProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  fullname: string;
  username: string;
  createdDate: string;
}

export const PostCardHeading: React.FC<PostCardHeadingProps> = ({
  onClick,
  fullname,
  username,
  createdDate,
}) => {
  return (
    <div onClick={onClick}>
      <span className="inline cursor-pointer truncate font-bold text-primary-100 hover:underline">
        {fullname}
      </span>
      <span className="ml-2 inline cursor-pointer truncate text-primary-300 hover:underline">
        {username}
      </span>
      <span className="ml-2 inline cursor-pointer truncate text-primary-300 hover:underline">
        {createdDate}
      </span>
    </div>
  );
};

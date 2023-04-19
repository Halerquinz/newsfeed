import React, { ReactElement } from "react";

export interface PostCardHeadingProps {
  fullname: string;
  username: string;
  createdDate: string;
}

export const PostCardHeading: React.FC<PostCardHeadingProps> = ({
  fullname,
  username,
  createdDate,
}) => {
  return (
    <>
      <span className="inline truncate font-bold text-primary-100">
        {fullname}
      </span>
      <span className="ml-2 inline truncate text-primary-300 hover:underline">
        {username}
      </span>
      <span className="ml-2 inline truncate text-primary-300 hover:underline">
        {createdDate}
      </span>
    </>
  );
};

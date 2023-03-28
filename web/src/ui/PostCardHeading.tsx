import React, { ReactElement } from "react";
import { SingleUser } from "./user/SingleUser";

export interface PostCardHeadingProps {
  fullname: string;
  username: string;
  // avatar: string;
  createdDate: string;
}

export const PostCardHeading: React.FC<PostCardHeadingProps> = ({
  fullname,
  username,
  // avatar,
  createdDate,
}) => {
  return (
    // <div className="flex w-full space-x-1 truncate leading-5 text-primary-100">
    //   <SingleUser
    //     className={"focus:outline-no-chrome"}
    //     size="sm"
    //     src={avatar}
    //   />
    //   <span className="inline truncate font-bold">{fullname}</span>
    //   <span className="inline truncate text-primary-300 hover:underline">
    //     {username}
    //   </span>
    //   <span className="inline truncate text-primary-300 hover:underline">
    //     {createdDate}
    //   </span>
    // </div>
    <div className="flex">
      <span className="inline truncate font-bold text-primary-100">
        {fullname}
      </span>
      <span className="ml-2 inline truncate text-primary-300 hover:underline">
        {username}
      </span>
      <span className="ml-2 inline truncate text-primary-300 hover:underline">
        {createdDate}
      </span>
    </div>
  );
};

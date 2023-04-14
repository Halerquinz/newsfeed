import React from "react";

interface PostCommentListProps {}

export const PostCommentList: React.FC<PostCommentListProps> = ({}) => {
  return (
    <div
      className={`flex flex-1 overflow-y-auto px-5 scrollbar-thin scrollbar-thumb-primary-700`}
    ></div>
  );
};

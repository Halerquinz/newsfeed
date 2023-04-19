import React from "react";
import { CommentDetail } from "../../../types/util-types";
import { CommentCard } from "../../../ui/CommentCard";

interface PostCommentListProps {
  commentMap?: CommentDetail[];
}

export const PostCommentList: React.FC<PostCommentListProps> = ({
  commentMap,
}) => {
  return (
    <div
      className={`flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-primary-700`}
    >
      {commentMap &&
        commentMap.map((comment: CommentDetail, idx) => (
          <CommentCard key={idx} {...comment} />
        ))}
    </div>
  );
};

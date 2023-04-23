import React from "react";
import { CommentDetail } from "../../../types/util-types";
import { CommentCard } from "../../../ui/CommentCard";

interface PostCommentListProps {
  commentMap?: CommentDetail[];
  postCreatorId: number;
}

export const PostCommentList: React.FC<PostCommentListProps> = ({
  commentMap,
  postCreatorId,
}) => {
  return (
    <div className={`flex flex-1 flex-col overflow-visible`}>
      {commentMap &&
        commentMap.map((comment: CommentDetail, idx) => (
          <CommentCard key={idx} {...comment} postCreatorId={postCreatorId} />
        ))}
    </div>
  );
};

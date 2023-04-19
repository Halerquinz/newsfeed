import React, { useMemo } from "react";
import { PostCommentInput } from "./PostCommentInput";
import { CommentDetail, Post, PostDetail } from "../../../types/util-types";
import { PostCommentList } from "./PostCommentList";
import { useGetPostComments } from "../../../shared-hooks/useGetPostComments";

interface PostCommentProps {
  commentMap: CommentDetail[];
  postId: number;
}

export const PostComment: React.FC<PostCommentProps> = ({
  commentMap,
  postId,
}) => {
  return (
    <div
      className={`flex h-full w-full flex-1 overflow-y-auto rounded-8 bg-primary-900 md:bg-primary-800`}
    >
      <div className={`flex w-full flex-1 flex-col`}>
        <PostCommentInput postId={postId} />
        <PostCommentList commentMap={commentMap} />
      </div>
    </div>
  );
};

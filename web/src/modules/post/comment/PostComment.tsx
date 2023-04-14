import React from "react";
import { PostCommentInput } from "./PostCommentInput";
import { PostDetail } from "../../../types/util-types";

interface PostCommentProps {
  data: PostDetail;
}

export const PostComment: React.FC<PostCommentProps> = ({ data }) => {
  return (
    <div
      className={`flex h-full w-full flex-1 overflow-y-auto rounded-8 bg-primary-900 md:mb-7 md:bg-primary-800`}
    >
      <div className={`flex w-full flex-1 flex-col md:mt-4`}>
        <PostCommentInput postId={data.id} />
      </div>
    </div>
  );
};

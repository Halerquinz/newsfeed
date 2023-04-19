import React from "react";
import { Data, PostDetail } from "../../../types/util-types";
import { PostComment } from "./PostComment";

interface PostCommentControllerProps {
  data: Data<PostDetail>;
}

export const PostCommentController: React.FC<PostCommentControllerProps> = ({
  data,
}) => {
  if (!data || data.status === "fail") {
    return null;
  }
  return <PostComment commentMap={data.data.comments} post={data.data.post} />;
};

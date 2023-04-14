import React from "react";
import { Data, PostDetail } from "../../../types/util-types";
import { PostComment } from "./PostComment";

interface PostCommentControllerProps {
  data: Data<PostDetail>;
}

export const PostCommentController: React.FC<PostCommentControllerProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }
  return <PostComment {...data} />;
};

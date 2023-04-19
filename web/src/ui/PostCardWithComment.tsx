import React from "react";
import { PostCardAvatar } from "./PostCardAvatar";
import { PostCardDesc } from "./PostCardDesc";
import { PostCardHeading } from "./PostCardHeading";
import { PostCardImage } from "./PostCardImage";
import { PostCardLeft } from "./PostCardLeft";
import { PostCardRight } from "./PostCardRight";
import { PostInteract } from "./PostInteract";
import { convertTZ } from "../ultils/convertTZ";
import { apiBaseUrl } from "../lib/tests/constants";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { CommentDetail } from "../types/util-types";
import { PostComment } from "../modules/post/comment/PostComment";

interface PostCardWithCommentProps {
  id: number;
  profilePicture: string;
  firstname: string;
  lastname: string;
  username: string;
  createdDate: string;
  description: string;
  image?: string;
  onClick?: () => void;
  likeCounts: number;
  commentCounts: number;
  likeStatus: number | null;
  commentMap: CommentDetail[];
}

export const PostCardWithComment: React.FC<PostCardWithCommentProps> = ({
  id,
  createdDate,
  firstname,
  lastname,
  username,
  profilePicture,
  description,
  image,
  onClick,
  likeCounts,
  commentCounts,
  likeStatus,
  commentMap,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full rounded-lg bg-primary-800 p-4 transition duration-200 ease-in-out "
    >
      <PostCardLeft>{<PostCardAvatar avatar={profilePicture} />}</PostCardLeft>
      <PostCardRight
        detail={
          <PostCardHeading
            createdDate={convertTZ(createdDate)}
            fullname={`${firstname} ${lastname}`}
            username={username}
          />
        }
        text={<PostCardDesc desc={description} />}
        image={image && <PostCardImage image={image} />}
        interact={
          <PostInteract
            postId={id}
            comments={commentCounts}
            likes={likeCounts}
            likeStatus={likeStatus}
          />
        }
        comment={
          commentMap && <PostComment commentMap={commentMap} postId={id} />
        }
      />
    </div>
  );
};

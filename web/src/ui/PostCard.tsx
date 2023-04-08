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

interface PostCardProps {
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
  likeStatus: 1 | -1 | null;
}

export const PostCard: React.FC<PostCardProps> = ({
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
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full rounded-lg bg-primary-800 p-4 transition duration-200 ease-in-out hover:bg-primary-700"
    >
      <PostCardLeft>{<PostCardAvatar avatar={profilePicture} />}</PostCardLeft>
      <PostCardRight>
        <PostCardHeading
          createdDate={convertTZ(createdDate)}
          fullname={`${firstname} ${lastname}`}
          username={username}
        />
        <PostCardDesc desc={description} />
        {image && <PostCardImage image={image} />}
        <PostInteract
          postId={id}
          comments={commentCounts}
          likes={likeCounts}
          likeStatus={likeStatus}
        />
      </PostCardRight>
    </div>
  );
};

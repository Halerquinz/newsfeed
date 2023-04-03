import React from "react";
import { PostCardAvatar } from "./PostCardAvatar";
import { PostCardDesc } from "./PostCardDesc";
import { PostCardHeading } from "./PostCardHeading";
import { PostCardImage } from "./PostCardImage";
import { PostCardLeft } from "./PostCardLeft";
import { PostCardRight } from "./PostCardRight";
import { PostInteract } from "./PostInteract";

interface PostCardProps {
  avatar: string;
  fullname: string;
  username: string;
  createdDate: string;
  desc: string;
  image?: string;
  onClick?: () => void;
  likes: number;
  comments: number;
}

export const PostCard: React.FC<PostCardProps> = ({
  createdDate,
  fullname,
  username,
  avatar,
  desc,
  image,
  onClick,
  likes,
  comments,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full rounded-lg bg-primary-800 p-4 transition duration-200 ease-in-out hover:bg-primary-700"
    >
      <PostCardLeft>{<PostCardAvatar avatar={avatar} />}</PostCardLeft>
      <PostCardRight>
        <PostCardHeading
          createdDate={createdDate}
          fullname={fullname}
          username={username}
        />
        <PostCardDesc desc={desc} />
        {image && <PostCardImage image={image} />}
        <PostInteract comments={comments} likes={likes} />
      </PostCardRight>
    </button>
  );
};

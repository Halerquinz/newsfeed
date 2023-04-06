import React from "react";
import { PostCardAvatar } from "./PostCardAvatar";
import { PostCardDesc } from "./PostCardDesc";
import { PostCardHeading } from "./PostCardHeading";
import { PostCardImage } from "./PostCardImage";
import { PostCardLeft } from "./PostCardLeft";
import { PostCardRight } from "./PostCardRight";
import { PostInteract } from "./PostInteract";
import { convertTZ } from "../ultils/convertTZ";

interface PostCardProps {
  profilePicture: string;
  firstname: string;
  lastname: string;
  username: string;
  createdDate: string;
  description: string;
  image?: string;
  onClick?: () => void;
  likes?: number;
  comments?: number;
}

export const PostCard: React.FC<PostCardProps> = ({
  createdDate,
  firstname,
  lastname,
  username,
  profilePicture,
  description,
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
      <PostCardLeft>{<PostCardAvatar avatar={profilePicture} />}</PostCardLeft>
      <PostCardRight>
        <PostCardHeading
          createdDate={convertTZ(createdDate)}
          fullname={`${firstname} ${lastname}`}
          username={username}
        />
        <PostCardDesc desc={description} />
        {image && <PostCardImage image={image} />}
        <PostInteract comments={comments} likes={likes} />
      </PostCardRight>
    </button>
  );
};

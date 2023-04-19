import React from "react";

interface PostCardImageProps {
  image: string;
}

export const PostCardImage: React.FC<PostCardImageProps> = ({ image }) => {
  return <img src={image} className="h-full w-full rounded-lg object-cover " />;
};

import React from "react";

interface PostCardImageProps {
  image: string;
}

export const PostCardImage: React.FC<PostCardImageProps> = ({ image }) => {
  return (
    <div className="undefined relative mt-3 inline-block w-full">
      <img src={image} className="h-full w-full rounded-lg object-fill " />
    </div>
  );
};

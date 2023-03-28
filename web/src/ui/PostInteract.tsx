import React from "react";
import SolidComment from "../icons/SolidComment";
import SolidLike from "../icons/SolidLike";

interface PostInteractProps {
  likes: number;
  comments: number;
}

export const PostInteract: React.FC<PostInteractProps> = ({
  likes,
  comments,
}) => {
  return (
    <div className="mt-3 flex">
      <div className="mr-10 flex items-center">
        <SolidLike />
        <div className="ml-3 font-bold text-primary-300">{likes}</div>
      </div>
      <div className="mr-10 flex items-center">
        <SolidComment />
        <div className="ml-3 font-bold text-primary-300">{comments}</div>
      </div>
    </div>
  );
};

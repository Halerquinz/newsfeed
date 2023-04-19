import React from "react";

interface PostCardDescProps {
  desc: string;
}

export const PostCardDesc: React.FC<PostCardDescProps> = ({ desc }) => {
  return (
    // <div className="inline break-words text-left font-semibold text-primary-100">
    <span className="inline break-words text-left font-semibold text-primary-100">
      {desc}
    </span>
  );
};

import React from "react";

interface PostCardLeftProps {
  children: React.ReactNode;
}

export const PostCardLeft: React.FC<PostCardLeftProps> = ({ children }) => {
  return <div className="mr-3 flex h-full">{children}</div>;
};

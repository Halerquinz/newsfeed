import React from "react";

interface PostCardRightProps {
  children: React.ReactNode;
}

export const PostCardRight: React.FC<PostCardRightProps> = ({ children }) => {
  return (
    <div
      className="flex w-full flex-1 flex-col
		"
    >
      {children}
    </div>
  );
};

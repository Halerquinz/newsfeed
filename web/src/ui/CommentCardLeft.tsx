import React from "react";

interface CommentCardLeftProps {
  children: React.ReactNode;
}

export const CommentCardLeft: React.FC<CommentCardLeftProps> = ({
  children,
}) => {
  return <div className="mr-3 flex h-full">{children}</div>;
};

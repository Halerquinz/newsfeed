import React from "react";

interface CommentCardTextProps {
  text: string;
}

export const CommentCardText: React.FC<CommentCardTextProps> = ({ text }) => {
  return (
    <span className="inline break-words text-left font-semibold text-primary-100">
      {text}
    </span>
  );
};

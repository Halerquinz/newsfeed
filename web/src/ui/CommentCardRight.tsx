import React from "react";

interface CommentCardRightProps {
  detail?: React.ReactNode;
  text?: React.ReactNode;
}

export const CommentCardRight: React.FC<CommentCardRightProps> = ({
  detail,
  text,
}) => {
  return (
    <div
      className="flex w-full flex-1 flex-col
		"
    >
      {detail && <div className="flex">{detail}</div>}
      {text && <div className="flex ">{text}</div>}
    </div>
  );
};

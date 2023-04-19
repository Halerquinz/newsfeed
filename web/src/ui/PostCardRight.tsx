import React from "react";

interface PostCardRightProps {
  detail?: React.ReactNode;
  text?: React.ReactNode;
  image?: React.ReactNode;
  interact?: React.ReactNode;
  comment?: React.ReactNode;
}

export const PostCardRight: React.FC<PostCardRightProps> = ({
  detail,
  text,
  image,
  interact,
  comment,
}) => {
  return (
    <div
      className="flex w-full flex-1 flex-col
		"
    >
      {detail && <div className="flex">{detail}</div>}
      {text && <div className="flex">{text}</div>}
      {image && (
        <div className="undefined relative mt-3 inline-block w-full">
          {image}
        </div>
      )}
      {interact && <div className="mt-3 flex">{interact}</div>}
      {comment && <div className="mt-3 flex">{comment}</div>}
    </div>
  );
};

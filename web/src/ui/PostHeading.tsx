import React from "react";
import { Button } from "./Button";
import { TitleText } from "./TitleText";

export interface PostHeadingProps {
  title: string;
  actionTitle: string;
  onActionClicked?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PostHeading: React.FC<PostHeadingProps> = ({
  actionTitle,
  onActionClicked,
  title,
}) => {
  return (
    <div className="mb-5 ml-4 flex items-end justify-between">
      <TitleText nameTitle={title} />
      <Button transition onClick={onActionClicked}>
        {actionTitle}
      </Button>
    </div>
  );
};

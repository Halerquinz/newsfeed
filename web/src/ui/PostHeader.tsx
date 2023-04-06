import React from "react";
import { Button } from "./Button";
import { TitleText } from "./TitleText";

export interface PostHeaderProps {
  title: string;
  actionTitle: string;
  onActionClicked?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  actionTitle,
  onActionClicked,
  title,
}) => {
  return (
    <div className="mb-5 ml-4 flex items-end justify-between">
      <TitleText nameTitle={title} />
      <Button
        data-testid="feed-action-button"
        transition
        onClick={onActionClicked}
      >
        {actionTitle}
      </Button>
    </div>
  );
};

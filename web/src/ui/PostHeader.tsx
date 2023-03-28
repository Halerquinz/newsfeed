import React from "react";
import { Button } from "./Button";

export interface PostHeaderProps {
  title?: string;
  actionTitle?: string;
  onActionClicked?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  actionTitle,
  onActionClicked,
  title,
}) => {
  return (
    <div className="mb-5 ml-4 flex items-end justify-between">
      <h4 className="text-primary-100">New Feed</h4>
      <Button
        data-testid="feed-action-button"
        transition
        onClick={onActionClicked}
      >
        New Post
      </Button>
    </div>
  );
};

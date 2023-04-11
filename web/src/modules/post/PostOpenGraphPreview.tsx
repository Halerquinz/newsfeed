import React from "react";
import { HeaderController } from "../display/HeaderController";
import { isServer } from "../../lib/tests/isServer";

interface PostOpenGraphPreviewProps {
  children: React.ReactNode;
  post?: any;
}

export const PostOpenGraphPreview: React.FC<PostOpenGraphPreviewProps> = ({
  post,
  children,
}) => {
  if (isServer && post) {
    const { username, description } = post;

    return (
      <HeaderController title={username} description={description} embed={{}} />
    );
  }

  return <>{children}</>;
};

import React, { useLayoutEffect, useRef, useState } from "react";
import SolidComment from "../icons/SolidComment";
import SolidLike from "../icons/SolidLike";
import { Button } from "./Button";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { apiBaseUrl } from "../lib/tests/constants";
import { formatNumber } from "../ultils/formatNumber";

interface PostInteractProps {
  postId: number;
  likes: number;
  comments: number;
  likeStatus: 1 | -1 | null;
}

export const PostInteract: React.FC<PostInteractProps> = ({
  postId,
  likes,
  comments,
  likeStatus,
}) => {
  let checked = false;
  if (likeStatus === 1) {
    checked = true;
  }

  const { token } = useTokenStore.getState();
  if (likeStatus != 1) {
  }

  const [checkStatus, setCheckStatus] = useState(checked);
  const currentLikes = useRef(likes);

  useLayoutEffect(() => {
    currentLikes.current = likes;
  }, [likes]);

  const handleLikeClick = async (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    await fetch(`${apiBaseUrl}/post/like`, {
      method: "POST",
      headers: {
        authorization: `beared ${token}`,
        postId,
      } as any,
    });

    if (checkStatus) {
      currentLikes.current -= 1;
    } else {
      currentLikes.current += 1;
    }

    setCheckStatus(!checkStatus);
  };

  return (
    <div className="mt-3 flex">
      <div className="mr-10 flex items-center">
        <Button
          onClick={handleLikeClick}
          size="tiny"
          color={"transparent"}
          transition={true}
        >
          <SolidLike checked={checkStatus} />
        </Button>
        <div className="ml-3 font-bold text-primary-300">
          {formatNumber(currentLikes.current)}
        </div>
      </div>
      <div className="mr-10 flex items-center">
        <Button
          size="tiny"
          color="transparent"
          transition={true}
          icon={<SolidComment />}
        />
        <div className="ml-3 font-bold text-primary-300">{comments}</div>
      </div>
    </div>
  );
};

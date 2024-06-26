import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import SolidComment from "../icons/SolidComment";
import SolidLike from "../icons/SolidLike";
import { Button } from "./Button";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { apiBaseUrl } from "../lib/tests/constants";
import { formatNumber } from "../ultils/formatNumber";
import { useUpdateQuery } from "../shared-hooks/useUpdateQuery";
import { useMutation } from "react-query";
import { queryClient } from "../lib/tests/queryClient";
import { CreatePostModal } from "../modules/dashboard/CreatePostModal";
import { ListUserLikeModal } from "../modules/post/ListUserLikeModal";
import { LikeDetail } from "../types/util-types";

interface PostInteractProps {
  postId: number;
  likes: number;
  comments: number;
  likeStatus: number | null;
  likesMap: LikeDetail[];
}

export const PostInteract: React.FC<PostInteractProps> = ({
  postId,
  likes,
  comments,
  likeStatus,
  likesMap,
}) => {
  const { token } = useTokenStore.getState();
  const [modal, setModal] = useState(false);

  const updateLikePost = useCallback(
    async (likeStatus: string) => {
      const res = await fetch(`${apiBaseUrl}/post/${likeStatus}`, {
        method: "POST",
        headers: {
          authorization: `beared ${token}`,
          postId,
        } as any,
      });
      return await res.json();
    },
    [likeStatus]
  );

  // const [checkStatus, setCheckStatus] = useState(checked);
  // const currentLikes = useRef(likes);
  const { mutateAsync: likePost } = useMutation(updateLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("/post");
      queryClient.invalidateQueries(`/post/get_post/${postId}`);
      queryClient.invalidateQueries(`/post/get-posts/user`);
    },
  });

  // useLayoutEffect(() => {
  //   currentLikes.current = likes;
  // }, [likes]);

  const handleLikeClick = async (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    let likeOrUnlike = "like";

    // if (checkStatus) {
    //   likeOrUnlike = "unlike";
    // }
    if (likeStatus) {
      likeOrUnlike = "unlike";
    }

    const res = await likePost(likeOrUnlike);

    // setCheckStatus(!checkStatus);
  };

  return (
    <>
      <div className="mr-10 flex items-center">
        <Button
          onClick={handleLikeClick}
          size="tiny"
          color={"transparent"}
          transition={true}
        >
          <SolidLike checked={!!likeStatus} />
        </Button>
        <div
          onClick={() => setModal(true)}
          className="ml-3 cursor-pointer font-bold text-primary-300 hover:underline"
        >
          {`${formatNumber(likes)}`}
        </div>
      </div>
      <div className="mr-10 flex items-center">
        <Button
          size="tiny"
          color={"transparent"}
          transition={true}
          icon={<SolidComment />}
        />
        <div className="ml-3 font-bold text-primary-300">{comments}</div>
      </div>
      {modal ? (
        <ListUserLikeModal
          likesMap={likesMap}
          onRequestClose={() => {
            setModal(false);
          }}
        />
      ) : null}
    </>
  );
};

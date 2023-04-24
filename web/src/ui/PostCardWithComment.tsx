import React, { useCallback, useContext } from "react";
import { PostCardAvatar } from "./PostCardAvatar";
import { PostCardDesc } from "./PostCardDesc";
import { PostCardHeading } from "./PostCardHeading";
import { PostCardImage } from "./PostCardImage";
import { PostCardLeft } from "./PostCardLeft";
import { PostCardRight } from "./PostCardRight";
import { PostInteract } from "./PostInteract";
import { convertTZ } from "../ultils/convertTZ";
import { apiBaseUrl } from "../lib/tests/constants";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { CommentDetail } from "../types/util-types";
import { PostComment } from "../modules/post/comment/PostComment";
import { useMutation } from "react-query";
import { SolidEllipsis } from "../icons";
import { queryClient } from "../lib/tests/queryClient";
import { AuthContext } from "../modules/auth/AuthProvider";
import { DropdownController } from "./DropdownController";
import { PostDropdown } from "./PostDropdown";
import { useRouter } from "next/router";
import { redirectToProfile } from "../lib/redirectToProfile";
import { usePreviousRouteStore } from "../global-stores/usePreviousRouteStore";

interface PostCardWithCommentProps {
  id: number;
  userId: number;
  profilePicture: string;
  firstname: string;
  lastname: string;
  username: string;
  createdDate: string;
  description: string;
  image?: string;
  onClick?: () => void;
  likeCounts: number;
  commentCounts: number;
  likeStatus: number | null;
  commentMap: CommentDetail[];
}

export const PostCardWithComment: React.FC<PostCardWithCommentProps> = ({
  id,
  userId: creatorId,
  createdDate,
  firstname,
  lastname,
  username,
  profilePicture,
  description,
  image,
  onClick,
  likeCounts,
  commentCounts,
  likeStatus,
  commentMap,
}) => {
  const { conn } = useContext(AuthContext);
  const { token } = useTokenStore.getState();
  const { route } = usePreviousRouteStore.getState();
  const { push, replace } = useRouter();

  const deletePost = useCallback(async () => {
    const res = await fetch(`${apiBaseUrl}/post/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      method: "DELETE",
    });
    return await res.json();
  }, [conn]);

  const { mutateAsync } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("/post");
      queryClient.invalidateQueries(`/post/get_post/${id}`);
      queryClient.invalidateQueries(`/post/get-posts/user`);
    },
  });

  return (
    <div
      onClick={onClick}
      className="relative flex w-full rounded-lg bg-primary-800 p-4 transition duration-200 ease-in-out"
    >
      <PostCardLeft>
        {
          <PostCardAvatar
            avatar={profilePicture}
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              redirectToProfile(e, creatorId, push);
            }}
          />
        }
      </PostCardLeft>
      <PostCardRight
        detail={
          <PostCardHeading
            createdDate={convertTZ(createdDate)}
            fullname={`${firstname} ${lastname}`}
            username={username}
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              redirectToProfile(e, creatorId, push);
            }}
          />
        }
        text={<PostCardDesc desc={description} />}
        image={image && <PostCardImage image={image} />}
        interact={
          <PostInteract
            postId={id}
            comments={commentCounts}
            likes={likeCounts}
            likeStatus={likeStatus}
          />
        }
        comment={
          commentMap && (
            <PostComment
              commentMap={commentMap}
              postId={id}
              postCreatorId={creatorId}
            />
          )
        }
      />
      <DropdownController
        className="absolute right-3 md:right-0"
        innerClassName="absolute transform -translate-x-full"
        overlay={() => (
          <PostDropdown
            onDeletePost={async (e: React.SyntheticEvent<EventTarget>) => {
              e.stopPropagation();
              const res = await mutateAsync();
              if (res.status === "success") {
                replace(route);
              }
            }}
            creatorId={creatorId}
          />
        )}
      >
        <SolidEllipsis />
      </DropdownController>
    </div>
  );
};

import React, { useCallback, useContext } from "react";
import { CommentCardAvatar } from "./CommentCardAvartar";
import { CommentCardDetailUser } from "./CommentCardDetailUser";
import { CommentCardLeft } from "./CommentCardLeft";
import { CommentCardRight } from "./CommentCardRight";
import { CommentCardText } from "./CommentCardText";
import { convertTZ } from "../ultils/convertTZ";
import { SolidEllipsis } from "../icons";
import { DropdownController } from "./DropdownController";
import { PostDropdown } from "./PostDropdown";
import { CommentDropdown } from "./CommentDropdown";
import { useMutation } from "react-query";
import { apiBaseUrl } from "../lib/tests/constants";
import { queryClient } from "../lib/tests/queryClient";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useTokenStore } from "../modules/auth/useTokenStore";
import { useRouter } from "next/router";

interface CommentCardProps {
  id: number;
  userId: number;
  postId: number;
  postCreatorId: number;
  profilePicture: string;
  username: string;
  createdDate: string;
  text: string;
  onClick?: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
  id,
  userId: creatorId,
  postId,
  postCreatorId,
  createdDate,
  username,
  profilePicture,
  text,
  onClick,
}) => {
  const { token } = useTokenStore.getState();

  const deleteComment = useCallback(async () => {
    const res = await fetch(`${apiBaseUrl}/comment/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
        postId,
      } as any,
      method: "DELETE",
    });
    return await res.json();
  }, [id]);

  const { mutateAsync } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("/post");
      queryClient.invalidateQueries(`/post/get_post/${postId}`);
      queryClient.invalidateQueries(`/post/get-posts/user`);
    },
  });
  return (
    <div
      onClick={onClick}
      className="relative flex w-full rounded-lg bg-primary-800 p-2 transition duration-200 ease-in-out"
    >
      <CommentCardLeft>
        {<CommentCardAvatar avatar={profilePicture} />}
      </CommentCardLeft>
      <CommentCardRight
        detail={
          <CommentCardDetailUser
            createdDate={convertTZ(createdDate)}
            username={username}
          />
        }
        text={<CommentCardText text={text} />}
      />
      <DropdownController
        zIndex={100}
        className="absolute right-3 md:right-0"
        innerClassName="absolute transform -translate-x-full"
        overlay={(close) => (
          <CommentDropdown
            onDeleteComment={async (e: React.SyntheticEvent<EventTarget>) => {
              await mutateAsync();
              close();
            }}
            onCloseDropdown={close}
            creatorId={creatorId}
            postCreatorId={postCreatorId}
          />
        )}
      >
        <SolidEllipsis />
      </DropdownController>
    </div>
  );
};

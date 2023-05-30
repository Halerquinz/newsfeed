import React, { useContext, useEffect, useState } from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { CenterLoader } from "../../ui/CenterLoader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { useGetPostByQueryParam } from "./useGetPostByQueryParam";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";
import { Data, PostDetail } from "../../types/util-types";
import { CreatePostModal } from "../dashboard/CreatePostModal";
import { PostHeader } from "../../ui/PostHeader";
import { PostCardImage } from "../../ui/PostCardImage";
import { PostCard } from "../../ui/PostCard";
import { PostComment } from "./comment/PostComment";
import { PostCommentController } from "./comment/PostCommentController";
import { PostCardWithComment } from "../../ui/PostCardWithComment";

interface PostPanelControllerProps {
  setPostData: React.Dispatch<
    React.SetStateAction<Data<PostDetail> | undefined>
  >;
}

export const PostPanelController: React.FC<PostPanelControllerProps> = ({
  setPostData,
}) => {
  const { data, isLoading } = useGetPostByQueryParam();
  const screenType = useScreenType();
  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }

  console.log(data);

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <MiddlePanel>
          <CenterLoader />
        </MiddlePanel>
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <HeaderController title={data?.data?.post.description} />
      <MiddlePanel>
        <div className={`flex flex-1 flex-col ${mb}`}>
          <PostCardWithComment
            commentMap={data?.data?.comments!}
            {...data?.data?.post!}
            likes={data.data?.likes!}
          />
        </div>
      </MiddlePanel>
    </>
  );
};

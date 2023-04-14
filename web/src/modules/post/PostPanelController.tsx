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

interface PostPanelControllerProps {
  setPostData: React.Dispatch<
    React.SetStateAction<Data<PostDetail> | undefined>
  >;
}

export const PostPanelController: React.FC<PostPanelControllerProps> = ({
  setPostData,
}) => {
  const { conn } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const { data, isLoading } = useGetPostByQueryParam();
  const screenType = useScreenType();

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

  const postCreator = data.data.user;

  return (
    <>
      <HeaderController title={data.data.description} />
      <MiddlePanel
        stickyChildren={
          screenType !== "fullscreen" ? (
            <>
              <PostHeader
                onTitleClick={
                  data.data.userId === conn?.user?.id
                    ? () => setShowEditModal(true)
                    : undefined
                }
                title={data.data.description}
                description={data.data.image || ""}
                name={postCreator ? postCreator.username : ""}
              />
              <PostCardImage image={data.data.image} />
            </>
          ) : (
            ""
          )
        }
      ></MiddlePanel>
    </>
  );
};

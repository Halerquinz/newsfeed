import React, { useContext, useState } from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { CenterLoader } from "../../ui/CenterLoader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { useGetPostByQueryParam } from "./useGetPostByQueryParam";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";
import { PostDetail } from "../../types/util-types";

interface PostPanelControllerProps {
  showMobileEditModal: boolean;
  setShowMobileEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPostData?: React.Dispatch<React.SetStateAction<PostDetail | undefined>>;
}

export const PostPanelController: React.FC<PostPanelControllerProps> = ({
  setRoomData,
  showMobileEditModal,
  setShowMobileEditModal,
}) => {
  const { conn } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const { data, isLoading } = useGetPostByQueryParam();
  const screenType = useScreenType();

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

  const postCreator = data.user;
  if (setRoomData) setRoomData(data);

  return (
    <>
      {showEditModal || showMobileEditModal ? (
        <CreateRoomModal
          onRequestClose={() => {
            setShowEditModal(false);
            setShowMobileEditModal(false);
          }}
          edit
          data={{
            name: data.room.name,
            description: data.room.description || "",
            privacy: data.room.isPrivate ? "private" : "public",
          }}
        />
      ) : null}
      <HeaderController embed={{}} title={data.room.name} />
      <MiddlePanel
        stickyChildren={
          screenType !== "fullscreen" ? (
            <RoomHeader
              onTitleClick={
                data.room.creatorId === conn.user.id
                  ? () => setShowEditModal(true)
                  : undefined
              }
              title={data.room.name}
              description={data.room.description || ""}
              names={roomCreator ? [roomCreator.username] : []}
            />
          ) : (
            ""
          )
        }
      >
        <UserPreviewModal {...data} />
        {screenType === "fullscreen" && open ? null : (
          <RoomUsersPanel {...data} />
        )}
        <div
          className={`sticky bottom-0 bg-primary-900 pb-7 ${
            (screenType === "fullscreen" || screenType === "1-cols") && open
              ? "flex-1"
              : ""
          }`}
        >
          <RoomPanelIconBarController {...data} />
        </div>
      </MiddlePanel>
    </>
  );
};

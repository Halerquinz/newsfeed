import React, { useContext } from "react";
import SvgSolidUser from "../icons/SolidUser";
import { BaseOverlay } from "./BaseOverlay";
import { SettingsIcon } from "./SettingsIcon";
import { SolidDelete, SolidFriends } from "../icons";
import { AuthContext } from "../modules/auth/AuthProvider";

interface CommentDropdownProps {
  onDeleteComment: (e: React.SyntheticEvent<EventTarget>) => Promise<void>;
  creatorId: number;
  postCreatorId: number;
  onCloseDropdown: () => void;
}

export const CommentDropdown: React.FC<CommentDropdownProps> = ({
  onDeleteComment,
  creatorId,
  postCreatorId,
  onCloseDropdown,
}) => {
  const currentUserId = useContext(AuthContext).conn?.user?.id;

  return (
    <div
      className="flex overflow-ellipsis whitespace-nowrap"
      style={{ width: 150 }}
    >
      <BaseOverlay>
        <div className="flex flex-col">
          <SettingsIcon icon={<SolidFriends />} label="Theo dõi" transition />
          {(currentUserId === creatorId || currentUserId === postCreatorId) && (
            <SettingsIcon
              onClick={(e: React.SyntheticEvent<EventTarget>) => {
                onDeleteComment(e);
                onCloseDropdown;
              }}
              icon={<SolidDelete />}
              label="Xóa"
              transition
              last={true}
            />
          )}
        </div>
      </BaseOverlay>
    </div>
  );
};

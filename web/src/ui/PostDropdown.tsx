import React, { useContext } from "react";
import SvgSolidUser from "../icons/SolidUser";
import { BaseOverlay } from "./BaseOverlay";
import { SettingsIcon } from "./SettingsIcon";
import { SolidDelete, SolidFriends } from "../icons";
import { AuthContext } from "../modules/auth/AuthProvider";

interface PostDropdownProps {
  onDeletePost: (e: React.SyntheticEvent<EventTarget>) => Promise<void>;
  onCloseDropdown?: () => void;
  creatorId: number;
}

export const PostDropdown: React.FC<PostDropdownProps> = ({
  onDeletePost,
  creatorId,
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
          {currentUserId === creatorId && (
            <SettingsIcon
              onClick={(e: React.SyntheticEvent<EventTarget>) =>
                onDeletePost(e)
              }
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

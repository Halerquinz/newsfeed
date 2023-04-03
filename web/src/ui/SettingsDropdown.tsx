import { useRouter } from "next/router";
import React, { useContext } from "react";
import SvgSolidUser from "../icons/SolidUser";
import { BaseOverlay } from "./BaseOverlay";
import { SettingsIcon } from "./SettingsIcon";
import { AuthContext } from "../modules/auth/AuthProvider";

export const SettingsDropdown: React.FC<{
  onCloseDropdown?: () => void;
  onActionButtonClicked: () => void;
}> = ({ onActionButtonClicked, onCloseDropdown }) => {
  const { conn } = useContext(AuthContext);
  const { push } = useRouter();

  return (
    <div
      className="flex overflow-ellipsis whitespace-nowrap"
      style={{ width: 200 }}
    >
      <BaseOverlay
        actionButton="Đăng xuất"
        onActionButtonClicked={onActionButtonClicked}
      >
        <div className="flex flex-col">
          <SettingsIcon
            onClick={() => push(`/u/${conn?.user?.id}`)}
            icon={<SvgSolidUser />}
            label="Hồ sơ"
            transition
            last={true}
          />
        </div>
      </BaseOverlay>
    </div>
  );
};

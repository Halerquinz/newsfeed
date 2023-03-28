import { useRouter } from "next/router";
import React from "react";
import SvgSolidUser from "../icons/SolidUser";
import { BaseOverlay } from "./BaseOverlay";
import { SettingsIcon } from "./SettingsIcon";

export const SettingsDropdown: React.FC<{
  onCloseDropdown?: () => void;
  onActionButtonClicked: () => void;
}> = ({ onActionButtonClicked, onCloseDropdown }) => {
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
            onClick={() => push("/user")}
            icon={<SvgSolidUser />}
            label="Hồ sơ"
            transition
          />
        </div>
      </BaseOverlay>
    </div>
  );
};

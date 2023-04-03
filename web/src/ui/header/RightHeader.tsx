import { useRouter } from "next/router";
import React, { useContext } from "react";
import SvgSolidMessages from "../../icons/SolidMessages";
import SvgSolidNotification from "../../icons/SolidNotification";
import { AuthContext } from "../../modules/auth/AuthProvider";
import { useTokenStore } from "../../modules/auth/useTokenStore";
import { DropdownController } from "../DropdownController";
import { SettingsDropdown } from "../SettingsDropdown";
import { SingleUser } from "../user/SingleUser";
import { apiBaseUrl } from "../../lib/tests/constants";

interface RightHeaderProps {
  onMessagesClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
  onNotificationsClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => null;
}

export const RightHeader: React.FC<RightHeaderProps> = ({
  onMessagesClick,
  onNotificationsClick,
}) => {
  const { conn } = useContext(AuthContext);

  const { push } = useRouter();

  if (!conn) {
    return <div />;
  }

  return (
    <div className="focus:outline-no-chrome flex w-full items-center justify-end space-x-4">
      {onMessagesClick && (
        <button onClick={onMessagesClick}>
          <SvgSolidMessages
            width={23}
            height={23}
            className="text-primary-200"
          />
        </button>
      )}
      {onNotificationsClick && (
        <button onClick={onNotificationsClick}>
          <SvgSolidNotification
            width={23}
            height={23}
            className="text-primary-200"
          />
        </button>
      )}
      <DropdownController
        zIndex={10}
        className="fixed top-9 right-3 md:right-0"
        innerClassName="fixed transform -translate-x-full"
        overlay={() => (
          <SettingsDropdown
            onActionButtonClicked={() => {
              useTokenStore.getState().setToken({ token: "" });
            }}
            // onCloseDropdown={close}
          />
        )}
      >
        <SingleUser
          className={"focus:outline-no-chrome"}
          size="sm"
          src={conn.user?.profilePicture}
        />
      </DropdownController>
    </div>
  );
};

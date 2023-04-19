import React, { useContext, useEffect, useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { SolidFriends, SolidCompass, SolidMessages } from "../icons";
import { SingleUser } from "./user/SingleUser";
import { useMutation, useQuery } from "react-query";
import { EditProfileModal } from "../modules/user/EditProfileModal";
import { useUpdateQuery } from "../shared-hooks/useUpdateQuery";
import { apiBaseUrl } from "../lib/tests/constants";
import { AuthContext } from "../modules/auth/AuthProvider";
import { Data, PostsResponse, Sex, User } from "../types/util-types";

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  pfp?: string;
  canDM?: boolean;
  isCurrentUser?: boolean;
  user: User;
  children?: React.ReactNode;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  username,
  user,
  isCurrentUser = true,
  children,
}) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const update = useUpdateQuery();
  const { conn } = useContext(AuthContext);
  return (
    <ProfileHeaderWrapper coverUrl={user.coverPicture}>
      <EditProfileModal
        isOpen={showEditProfileModal}
        onRequestClose={() => setShowEditProfileModal(false)}
        onEdit={(d) => {
          update(`/user/${conn?.user?.id}`, (preData: Data<User>) =>
            !preData
              ? preData
              : {
                  status: "success",
                  data: { ...preData.data, ...d },
                }
          );
        }}
      />
      <div className="mr-4 flex ">
        <SingleUser
          className="absolute -top-5.5 flex-none rounded-full bg-primary-900 shadow-outlineLg"
          src={user.profilePicture}
        />
      </div>
      <div className="flex w-3/6 flex-col font-sans">
        <h4 className="truncate font-bold text-primary-100">{displayName}</h4>
        <div className="flex flex-row items-center">
          <p
            className="mr-2 text-primary-300"
            data-testid="profile-info-username"
          >{`@${username}`}</p>
        </div>
        <div className="mt-2 flex">{children}</div>
      </div>

      <div className="sm:w-3/6">
        <div className="flex flex-row content-end justify-end gap-2">
          {!isCurrentUser && (
            <Button
              loading={false}
              onClick={async () => {}}
              size="small"
              color="primary"
              icon={<SolidFriends />}
            ></Button>
          )}
          {isCurrentUser ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                setShowEditProfileModal(true);
              }}
              icon={<SolidCompass />}
            >
              Chỉnh sửa hồ sơ
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </ProfileHeaderWrapper>
  );
};

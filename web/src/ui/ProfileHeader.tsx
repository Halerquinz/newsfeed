import React, { useContext, useEffect, useMemo, useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { SolidFriends, SolidCompass, SolidMessages } from "../icons";
import { SingleUser } from "./user/SingleUser";
import { useMutation, useQuery } from "react-query";
import { EditProfileModal } from "../modules/user/EditProfileModal";
import { useUpdateQuery } from "../shared-hooks/useUpdateQuery";
import { apiBaseUrl } from "../lib/tests/constants";
import { AuthContext } from "../modules/auth/AuthProvider";
import {
  Data,
  PostsResponse,
  Sex,
  UserWithFollowInfo,
} from "../types/util-types";
import { UserBadge } from "./UserBadge";
import { followAction } from "../lib/followAction";
import { queryClient } from "../lib/tests/queryClient";

export interface ProfileHeaderProps {
  isCurrentUser?: boolean;
  user: UserWithFollowInfo;
  children?: React.ReactNode;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isCurrentUser = true,
  children,
}) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const update = useUpdateQuery();
  const { conn } = useContext(AuthContext);
  // const followFn = useMemo(() => followAction(), []);
  const followFn = followAction();
  const { mutateAsync: follow, isLoading: followLoading } =
    useMutation(followFn);

  return (
    <ProfileHeaderWrapper coverUrl={user.coverPicture}>
      <EditProfileModal
        isOpen={showEditProfileModal}
        onRequestClose={() => setShowEditProfileModal(false)}
        onEdit={(d) => {
          update(
            `/user/userWithFollowInfo/${conn?.user?.id}`,
            (preData: Data<UserWithFollowInfo>) =>
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
        <h4 className="truncate font-bold text-primary-100">{`${user.firstname} ${user.lastname}`}</h4>
        <div className="flex flex-row items-center">
          <p
            className="mr-2 text-primary-300"
            data-testid="profile-info-username"
          >{`@${user.username}`}</p>
          {user.followsYou && (
            <UserBadge color="grey" variant="primary-700">
              Theo dõi bạn
            </UserBadge>
          )}
        </div>
        <div className="mt-2 flex">{children}</div>
      </div>

      <div className="sm:w-3/6">
        <div className="flex flex-row content-end justify-end gap-2">
          {!isCurrentUser && (
            <Button
              loading={followLoading}
              onClick={async () => {
                follow(user.id);
                update(
                  `/user/userWithFollowInfo/${user.id}`,
                  (d: Data<UserWithFollowInfo>) =>
                    !d
                      ? d
                      : {
                          status: "success",
                          data: {
                            ...d.data,
                            followerCount:
                              d.data?.followerCount! +
                              (d.data?.youAreFollowing ? -1 : 1),
                            youAreFollowing: !d.data?.youAreFollowing,
                          },
                        }
                );
              }}
              size="small"
              color={user.youAreFollowing ? "secondary" : "primary"}
              icon={user.youAreFollowing ? null : <SolidFriends />}
            >
              {user.youAreFollowing ? "Bỏ theo dõi " : "Theo dõi"}
            </Button>
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

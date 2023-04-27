import React from "react";
import { UserWithFollowInfo } from "../types/util-types";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";

interface UserProfileProps {
  isCurrentUser: boolean;
  user: UserWithFollowInfo;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  isCurrentUser,
  user,
}) => {
  return (
    <>
      <ProfileHeader user={user} isCurrentUser={isCurrentUser} />
      <ProfileTabs className="mt-4" user={user} />
    </>
  );
};

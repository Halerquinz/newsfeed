import React from "react";
import { User } from "../types/util-types";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";

interface UserProfileProps {
  isCurrentUser: boolean;
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  isCurrentUser,
  user,
}) => {
  return (
    <>
      <ProfileHeader
        user={user}
        displayName={`${user.firstname} ${user.lastname}`}
        username={user.username}
        isCurrentUser={isCurrentUser}
      />
      <ProfileTabs className="mt-4" user={user} />
    </>
  );
};

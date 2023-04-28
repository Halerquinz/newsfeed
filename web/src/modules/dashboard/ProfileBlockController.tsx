import React, { useContext, useState } from "react";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { UserSummaryCard } from "../../ui/UserSummaryCard";
import { AuthContext } from "../auth/AuthProvider";
import { formatDay } from "../../lib/tests/formatDay";
import { Spinner } from "../../ui/Spinner";
import { useRouter } from "next/router";
import { EditProfileModal } from "../user/EditProfileModal";

interface ProfileBlockControllerProps {}

export const ProfileBlockController: React.FC<
  ProfileBlockControllerProps
> = ({}) => {
  // props onClick in UserSummaryCard: click -> user detail Page
  const { conn } = useContext(AuthContext);
  const { push } = useRouter();

  if (!conn) {
    return null;
  }

  return (
    <>
      <ProfileBlock
        top={
          <UserSummaryCard
            id={conn.user?.id!}
            about={conn.user?.about}
            profilePicture={conn.user?.profilePicture!}
            username={conn.user?.username!}
            fullname={`${conn.user?.firstname} ${conn.user?.lastname}`}
            createdDate={formatDay(conn.user?.createdDate!)}
            numFollowers={conn.user?.followerCount!}
            numFollowing={conn.user?.followingCount!}
            onClick={() => push(`/u/${conn.user?.id}`)}
          />
        }
      />
    </>
  );
};

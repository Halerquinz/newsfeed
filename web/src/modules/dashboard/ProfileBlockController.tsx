import React, { useContext } from "react";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { UserSummaryCard } from "../../ui/UserSummaryCard";
import { AuthContext } from "../auth/AuthProvider";
import { formatDay } from "../../lib/tests/formatDay";
import { Spinner } from "../../ui/Spinner";
import { useRouter } from "next/router";

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
    <React.Fragment>
      <ProfileBlock
        top={
          <UserSummaryCard
            about={conn.user?.about}
            profilePicture={conn.user?.profilePicture!}
            username={conn.user?.username!}
            fullname={`${conn.user?.firstname} ${conn.user?.lastname}`}
            createdDate={formatDay(conn.user?.createdDate!)}
            numFollowers={2000}
            numFollowing={1000}
            onClick={() => push(`/u/${conn.user?.id}`)}
          />
        }
      />
    </React.Fragment>
  );
};

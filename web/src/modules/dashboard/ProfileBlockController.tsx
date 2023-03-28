import React, { useContext } from "react";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { UserSummaryCard } from "../../ui/UserSummaryCard";
import { AuthContext } from "../auth/AuthProvider";

interface ProfileBlockControllerProps {}

export const ProfileBlockController: React.FC<
  ProfileBlockControllerProps
> = ({}) => {
  // get user from global store
  // if !user return null
  // get all property and add to props of UserSummaryCard
  // props onClick in UserSummaryCard: click -> user detail Page
  const { conn } = useContext(AuthContext);

  if (!conn) {
    return null;
  }

  const avatarUrl =
    "https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX_HBnqd&_nc_ht=scontent.fsgn8-3.fna&oh=03_AdR-oaxb25vrkgWc0C8z5FXY7ME3TRpc_OqG3LQMy8iG0A&oe=6448F5A7";

  const about =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries";
  return (
    <React.Fragment>
      <ProfileBlock
        top={
          <UserSummaryCard
            avatarUrl={avatarUrl}
            username="phuonguyen666"
            about={about}
            fullname="Phuong Uyen"
            createdDate="19/11/2002"
            numFollowers={2000}
            numFollowing={1000}
          />
        }
      />
    </React.Fragment>
  );
};

import React, { useEffect, useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { Button } from "./Button";
import { SolidFriends, SolidCompass, SolidMessages } from "../icons";
import { SingleUser } from "./user/SingleUser";

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  children?: React.ReactNode;
  pfp?: string;
  canDM?: boolean;
  isCurrentUser?: boolean;
  user: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  username,
  user,
  children,
  canDM,
  isCurrentUser = true,
  pfp = "",
}) => {
  // const { mutateAsync, isLoading: followLoading } =
  //   useTypeSafeMutation("follow");
  // const { mutateAsync: unblock, isLoading: unblockLoading } =
  //   useTypeSafeMutation("userUnblock");
  // const { mutateAsync: block, isLoading: blockLoading } =
  //   useTypeSafeMutation("userBlock");

  // const { t } = useTypeSafeTranslation();
  // const updater = useTypeSafeUpdateQuery();
  // const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  // const preloadPush = usePreloadPush();
  // const update = useTypeSafeUpdateQuery();

  return (
    // @TODO: Add the cover api (once it's implemented)}
    <ProfileHeaderWrapper
      coverUrl={
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d9b57d6-164a-4be2-b6c7-2b27afd5753f/d9mb9mb-1bed4022-6a0f-4525-90fc-a1a9848aba39.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJkOWI1N2Q2LTE2NGEtNGJlMi1iNmM3LTJiMjdhZmQ1NzUzZlwvZDltYjltYi0xYmVkNDAyMi02YTBmLTQ1MjUtOTBmYy1hMWE5ODQ4YWJhMzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RS7WWLOkhnsUdJO2QRATYR7oXUmGmmZptBQ5oifdMw0"
      }
    >
      {/* <EditProfileModal
        isOpen={showEditProfileModal}
        onRequestClose={() => setShowEditProfileModal(false)}
        onEdit={(d) => {
          update(["getUserProfile", d.username], (x) =>
            !x ? x : { ...x, ...d }
          );
          if (d.username !== username) {
            preloadPush({
              route: "profile",
              data: { username: d.username },
            });
          }
        }}
      /> */}
      <div className="mr-4 flex ">
        <SingleUser
          className="absolute -top-5.5 flex-none rounded-full bg-primary-900 shadow-outlineLg"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdMXAVte8vyQDZYQVaRMgIreTUrEYyWnDLFY8FQqu7xw&skk"
          }
        />
      </div>
      <div className="flex w-3/6 flex-col font-sans">
        <h4 className="truncate font-bold text-primary-100">
          {displayName || username}
        </h4>
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
              size="small"
              color={"primary"}
              onClick={async () => {}}
            ></Button>
          )}
          {!isCurrentUser && (
            <Button
              loading={false}
              onClick={async () => {}}
              size="small"
              // color={user.youAreFollowing ? "secondary" : "primary"}
              color="primary"
              icon={<SolidFriends />}
              // icon={user.youAreFollowing ? null : <SolidFriends />}
            >
              {/* {user.youAreFollowing
                ? t("pages.viewUser.unfollow")
                : t("pages.viewUser.followHim")} */}
            </Button>
          )}
          {isCurrentUser ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {}}
              icon={<SolidCompass />}
            >
              Edit Profile
            </Button>
          ) : (
            ""
          )}
          {canDM ? (
            <Button size="small" color="secondary" icon={<SolidMessages />}>
              send Dm
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </ProfileHeaderWrapper>
  );
};

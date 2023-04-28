import React, { useContext, useState } from "react";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileAdmin } from "./ProfileAdmin";
import { AuthContext } from "../modules/auth/AuthProvider";
import { UserWithFollowInfo } from "../types/util-types";
import { ProfileFeed } from "./ProfileFeed";

export interface ProfileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserWithFollowInfo;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  className,
  user,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState("about");
  const { conn } = useContext(AuthContext);
  return (
    <>
      <div
        className={`flex w-full items-center justify-around ${className}`}
        {...props}
      >
        <button
          className={`focus:outline-no-chrome border-b-2 border-primary-900 py-1 text-base font-bold text-primary-100 transition hover:border-accent
               ${activeTab === "about" && `border-accent text-accent`}
          `}
          onClick={() => setActiveTab("about")}
        >
          Giới thiệu
        </button>

        <button
          className={`focus:outline-no-chrome border-b-2 border-primary-900 py-1 text-base font-bold text-primary-100 transition hover:border-accent
               ${activeTab === "about" && `border-accent text-accent`} ${
            !user.about ? "hidden" : ""
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Bài viết
        </button>

        <button
          className={`focus:outline-no-chrome border-b-2 border-primary-900 py-1 text-base font-bold text-primary-100 transition hover:border-accent
               ${activeTab === "admin" && `border-accent text-accent`} ${
            conn?.user?.isAdmin && conn?.user.id !== user.id ? "" : "hidden"
          }`}
          onClick={() => setActiveTab("admin")}
        >
          admin
        </button>
      </div>

      <div>
        <ProfileAbout
          userId={user.id}
          className={activeTab !== "about" ? "hidden" : ""}
          username={user.username}
          followers={user.followerCount}
          following={user.followingCount}
          about={user.about}
        />
        <ProfileFeed
          currentUserId={user.id}
          className={activeTab !== "feed" ? "hidden" : ""}
        />
        {/* <ProfileAdmin
          className={activeTab !== "admin" ? "hidden" : ""}
          user={user}
        /> */}
      </div>
    </>
  );
};

import React from "react";
import { formatNumber } from "../ultils/formatNumber";
import Link from "next/link";

export interface ProfileAboutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  followers: number;
  following: number;
  description?: string;
  link?: string;
  about: string;
  userId: number;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
  userId,
  username,
  followers,
  following,
  about,
  link,
  className = "",
}) => {
  return (
    <div
      className={`mt-2 w-full rounded-8 bg-primary-800 p-4 leading-8 ${className}`}
      style={{ maxWidth: 640 }}
    >
      <div className="pb-4 text-xl font-bold text-primary-100">{username}</div>
      <div className="mb-2 flex">
        <div className="group mr-4 flex">
          <Link href={`/u/${userId}/follower`}>
            <span className="font-bold text-primary-100">
              {formatNumber(followers)}
            </span>
            <span className="ml-1 lowercase text-primary-300 group-hover:underline">
              Người theo dõi
            </span>
          </Link>
        </div>
        <div className="group flex">
          <Link href={`/u/${userId}/following`}>
            <span className="font-bold text-primary-100">
              {formatNumber(following)}
            </span>
            <span className="ml-1 lowercase text-primary-300 group-hover:underline">
              Đang theo dõi
            </span>
          </Link>
        </div>
      </div>
      <div className="max-h-5l overflow-y-auto whitespace-pre-wrap pb-4 text-primary-100">
        {about}
      </div>
    </div>
  );
};

import React from "react";
import { formatNumber } from "../ultils/formatNumber";

export interface ProfileAboutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  followers: number;
  following: number;
  description?: string;
  link?: string;
  about: string;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
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
          <span className="font-bold text-primary-100">
            {formatNumber(followers)}
          </span>
          <span className="ml-1 lowercase text-primary-300 group-hover:underline">
            Người theo dõi
          </span>
        </div>
        <div className="group flex">
          <span className="font-bold text-primary-100">
            {formatNumber(following)}
          </span>
          <span className="ml-1 lowercase text-primary-300 group-hover:underline">
            Đang theo dõi
          </span>
        </div>
      </div>
      <div className="max-h-5l overflow-y-auto whitespace-pre-wrap pb-4 text-primary-100">
        {about}
      </div>
    </div>
  );
};

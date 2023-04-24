import React from "react";
import { SingleUser } from "./user/SingleUser";
import { formatNumber } from "../ultils/formatNumber";

interface UserSummaryCardProps {
  onClick?: () => void;
  id?: string;
  username: string;
  numFollowers: number;
  numFollowing: number;
  profilePicture: string;
  about?: string;
  createdDate?: string;
  fullname: string;
}

export const CreatedDate: React.FC<{ createAt?: string }> = ({ createAt }) => (
  <p className="mt-3 font-bold text-accent">{`Tham gia vào: ${createAt}`}</p>
);

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  onClick,
  id,
  username,
  numFollowers,
  numFollowing,
  about,
  profilePicture,
  createdDate,
  fullname,
}) => {
  return (
    <div className="flex w-full flex-col rounded-8 bg-primary-800 p-4">
      <button className="flex" onClick={onClick}>
        <div className="flex">
          <SingleUser size="default" src={profilePicture} />
        </div>
        <div className="mt-2 flex">
          <div className="ml-3 flex flex-col">
            <span className="overflow-hidden break-all text-left font-bold text-primary-100">
              {`${fullname}`}
            </span>
            <span className="break-all text-left text-primary-300">
              {username}
            </span>
          </div>
        </div>
      </button>
      <div className="mt-3 flex">
        <div className="flex rounded-8 px-2 py-1 transition duration-200 ease-in-out hover:bg-primary-700">
          <span className="font-bold text-primary-100">
            {formatNumber(numFollowers)}
          </span>
          <span className="ml-1.5 lowercase text-primary-300">followers</span>
        </div>
        <div className="flex rounded-8 px-2 py-1 transition duration-200 ease-in-out hover:bg-primary-700">
          <span className="font-bold text-primary-100">
            {formatNumber(numFollowing)}
          </span>
          <span className="ml-1.5 lowercase text-primary-300">following</span>
        </div>
      </div>
      {about !== "null" && (
        <div className="mt-3 flex break-words text-left text-primary-300">
          {about}
        </div>
      )}
      <CreatedDate createAt={createdDate} />
    </div>
  );
};

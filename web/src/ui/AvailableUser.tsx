import Link from "next/link";
import React from "react";
import { SingleUser } from "./user/SingleUser";

interface AvailableUserType {
  firstname: string;
  lastname: string;
  profilePicture: string;
  username: string;
  id: number;
}

export const AvailableUser: React.FC<AvailableUserType> = ({
  firstname,
  lastname,
  profilePicture,
  username,
  id,
}) => (
  <div className="flex w-full py-3">
    <SingleUser size="sm" src={profilePicture} username={username} />
    <div className="ml-3 flex flex-col justify-center overflow-hidden">
      <Link href={`/u/${id}`}>
        <h5 className="font-bold text-primary-100">{`${firstname} ${lastname}`}</h5>
      </Link>
      <a className={`block truncate text-primary-300 hover:underline`}>
        {username}
      </a>
    </div>
  </div>
);

export const AvailableUserWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex w-full flex-1 flex-col overflow-y-auto pb-5">
    {children}
  </div>
);

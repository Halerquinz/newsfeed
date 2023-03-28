import React from "react";

export interface ProfileBlockProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export const ProfileBlock: React.FC<ProfileBlockProps> = ({ top, bottom }) => {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mb-5 flex max-w-md items-end justify-between">{top}</div>
      <div className="mb-5 flex max-w-md items-end justify-between">
        {bottom}
      </div>
    </div>
  );
};

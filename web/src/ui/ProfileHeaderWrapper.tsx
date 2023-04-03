import React, { ReactNode } from "react";

export interface ProfileHeaderWrapperProps {
  children: ReactNode;
  coverUrl: string;
}

export const ProfileHeaderWrapper: React.FC<ProfileHeaderWrapperProps> = ({
  children,
  coverUrl,
  ...props
}) => {
  return (
    <div className="relative rounded-8 bg-primary-800" {...props}>
      <img
        alt="cover"
        src={coverUrl}
        className="w-full rounded-t-8 object-cover"
        style={{ height: "155px" }}
      />
      <div className="container relative mx-auto p-4 sm:flex">{children}</div>
    </div>
  );
};

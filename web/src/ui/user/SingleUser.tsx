import React from "react";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "20px",
  xxs: "30px",
};

export const onlineIndicatorStyleMap = {
  default: {
    width: "15px",
    height: "15px",
    right: "2px",
    bottom: "-4px",
    borderWidth: "4px",
  },
  lg: {
    width: "12px",
    height: "12px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  md: {
    width: "10px",
    height: "10px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  sm: {
    width: "8px",
    height: "8px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  xs: {
    width: "4px",
    height: "4px",
    right: "0px",
    bottom: "-1px",
    borderWidth: "1px",
  },
  xxs: {
    width: "6px",
    height: "6px",
    right: "1px",
    bottom: "-1px",
    borderWidth: "1px",
  },
};

interface SingleUserProps {
  size?: keyof typeof onlineIndicatorStyleMap;
  username?: string;
  src?: string;
  className?: string;
  hover?: boolean;
}

export const SingleUser: React.FC<SingleUserProps> = ({
  size = "default",
  username,
  className,
  src,
  hover,
}) => {
  // const sizeStyle = onlineIndicatorStyleMap[size];
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <img
        alt={username ? `${username}-s-avatar` : "your-avatar"}
        // style={{
        //   boxShadow: "0 0 0 2px var(--color-accent)",
        // }}
        className={`h-full w-full rounded-full object-cover
        `}
        src={src}
      />
      {hover && (
        <div
          className={`absolute top-0 left-0 h-full w-full rounded-full bg-primary-900 opacity-0 transition duration-200 hover:opacity-20`}
        ></div>
      )}
    </div>
  );
};

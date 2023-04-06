import React from "react";

interface TitleTextProps {
  className?: string;
  nameTitle: string;
}

export const TitleText: React.FC<TitleTextProps> = ({
  className,
  nameTitle,
}) => {
  return <h4 className={`text-primary-100 ${className}`}>{nameTitle}</h4>;
};

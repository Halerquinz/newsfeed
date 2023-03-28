import React from "react";
import { useMediaQuery } from "react-responsive";
import LgLogo from "../../icons/LgLogo";

interface HeaderControllerProps {}

export const HeaderController: React.FC<HeaderControllerProps> = ({}) => {
  const screenWidth = useMediaQuery({ minWidth: 640 });
  if (!screenWidth)
    return (
      <>
        <LgLogo />
      </>
    );

  return <></>;
};

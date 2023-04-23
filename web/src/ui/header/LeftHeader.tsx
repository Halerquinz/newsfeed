import Link from "next/link";
import React from "react";
import LgLogo from "../../icons/LgLogo";
import LogoIcon from "../../icons/LogoIcon";
import { useScreenType } from "../../shared-hooks/useScreenType";

interface LeftHeaderProps {}

export const LeftHeader: React.FC<LeftHeaderProps> = ({}) => {
  const screenType = useScreenType();

  return (
    <>
      <Link href="/dash">
        <div className="w-full">
          {screenType === "3-cols" ? <LgLogo /> : <LogoIcon />}
        </div>
      </Link>
    </>
  );
};

import React from "react";
import { SearchBarController } from "../../modules/search/SearchBarController";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";

export interface MiddleHeaderProps {}

export const MiddleHeader: React.FC<MiddleHeaderProps> = () => {
  const screenType = useScreenType();

  return (
    <div className="flex w-full flex-1 justify-center">
      {screenType === "fullscreen" ? (
        <div className="mr-4 flex">
          <LeftHeader />
        </div>
      ) : null}
      <SearchBarController />
      {screenType === "1-cols" || screenType === "fullscreen" ? (
        <div className="ml-4 flex">
          <RightHeader />
        </div>
      ) : null}
    </div>
  );
};

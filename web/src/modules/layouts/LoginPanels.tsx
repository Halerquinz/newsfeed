import React from "react";
import { useMediaQuery } from "react-responsive";

interface TopPanelProps {
  children: React.ReactNode;
}

export const TopPanel: React.FC<TopPanelProps> = ({ children }) => {
  const screenWidth = useMediaQuery({ minWidth: 640 });
  // if (!screenWidth)
  //   return (
  //     <div className="flex self-center justify-self-center">{children}</div>
  //   );

  return (
    <>
      {screenWidth ? (
        <div className="flex"></div>
      ) : (
        <div className="flex self-center justify-self-center">{children}</div>
      )}
    </>
  );
  // return (
  //   <>
  //     <div className="flex"></div>
  //   </>
  // );
};

interface BottomPanelProps {
  children: React.ReactNode;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({ children }) => {
  return (
    <div className="absolute bottom-0 mt-auto flex w-full flex-row items-center justify-between px-5 py-5 sm:px-7">
      {children}
    </div>
  );
};

interface MiddleLoginPanelProps {
  children?: React.ReactNode;
}
export const MiddleLoginPanel: React.FC<MiddleLoginPanelProps> = ({
  children,
}) => {
  return (
    <div className="relative z-10 m-auto flex w-full flex-col gap-5 bg-primary-800 p-6 sm:w-400 sm:rounded-8">
      {children}
    </div>
  );
};

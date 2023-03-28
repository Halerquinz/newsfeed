import React from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";

interface MainLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  children?: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  floatingPostInfo?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  leftPanel = <div />,
  rightPanel = <div />,
  children,
  tabletSidebar,
  floatingPostInfo,
  mobileHeader,
}) => {
  // fetch user from global store
  // const me = user ? user : undefined

  const screenType = useScreenType();
  let middle = null;
  let prepend = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
          {floatingPostInfo}
        </>
      );
      break;
    // case "fullscreen":
    //   prepend = (
    //     <>
    //       {mHeader}
    //       <MobileNav items={items}></MobileNav>
    //     </>
    //   );
    //   middle = (
    //     <>
    //       {children}
    //       {floatingRoomInfo}
    //       <AccountOverlay />
    //     </>
    //   );
  }

  return (
    <>
      <div className={`fixed left-0 z-10 w-full`} style={{ top: 0 }}>
        {prepend}
      </div>
      <div
        className={`flex w-full flex-col items-center scrollbar-thin scrollbar-thumb-primary-700 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};

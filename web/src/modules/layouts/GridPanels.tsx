import React, { ReactNode, useContext } from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel";
import { LeftHeader } from "../../ui/header/LeftHeader";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { RightHeader } from "../../ui/header/RightHeader";
import { AuthContext } from "../auth/AuthProvider";

const HeaderWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className={`mb-7 flex h-6 items-center`}>{children}</div>;

interface LeftPanelProps {
  children: React.ReactNode;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LeftHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};
interface GridPanelProps {
  stickyChildren?: React.ReactNode;
  children: React.ReactNode;
}

export const MiddlePanel: React.FC<GridPanelProps> = ({
  children,
  stickyChildren,
}) => {
  const screenType = useScreenType();

  return (
    <GridPanel>
      <div
        className={
          !(screenType === "fullscreen" && !stickyChildren)
            ? `sticky z-10 flex w-full flex-col bg-primary-900 pt-5`
            : ""
        }
        style={
          screenType === "fullscreen" ? { marginTop: "45px" } : { top: "0px" }
        }
      >
        {screenType !== "fullscreen" ? (
          <HeaderWrapper>
            <MiddleHeader />
          </HeaderWrapper>
        ) : (
          ""
        )}
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};

interface RightPanelProps {
  children: React.ReactNode;
}

export const RightPanel: React.FC<RightPanelProps> = ({ children }) => {
  const { conn } = useContext(AuthContext);

  return (
    <FixedGridPanel>
      <HeaderWrapper>
        {conn ? (
          <RightHeader
            onMessagesClick={(e) => null}
            onNotificationsClick={(e) => null}
          />
        ) : null}
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
};

import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";
import { LeftPanel, MiddlePanel, RightPanel } from "../layouts/GridPanels";
import { UserProfileController } from "./UserProfileController";
import { HeaderController } from "../../modules/display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";
import { WaitForAuth } from "../auth/WaitForAuth";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import NoSSR from "../../ultils/noSSR";
import { FollowingController } from "./FollowingController";

interface UserPageProps {}

export const FollowingPage: PageComponent<UserPageProps> = ({}) => {
  return (
    <NoSSR>
      <WaitForAuth>
        <HeaderController title="Danh sách theo dõi" />
        <MainLayout
          leftPanel={<AvailableUserController />}
          rightPanel={<ProfileBlockController />}
        >
          <FollowingController />
        </MainLayout>
      </WaitForAuth>
    </NoSSR>
  );
};

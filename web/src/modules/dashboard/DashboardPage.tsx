import React, { useContext } from "react";
import { isServer } from "../../lib/tests/isServer";
import { PageComponent } from "../../types/PageComponent";
import NoSSR from "../../ultils/noSSR";
import { WaitForAuth } from "../auth/WaitForAuth";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PostController } from "./PostController";

interface DashboardPageProps {}

export const DashboardPage: PageComponent<DashboardPageProps> = ({}) => {
  return (
    <div>
      <NoSSR>
        <WaitForAuth>
          <DefaultDesktopLayout>{<PostController />}</DefaultDesktopLayout>
        </WaitForAuth>
      </NoSSR>
    </div>
  );
};

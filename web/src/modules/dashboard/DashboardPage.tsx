import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { WaitForAuth } from "../auth/WaitForAuth";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PostController } from "./PostController";

interface DashboardPageProps {}

export const DashboardPage: PageComponent<DashboardPageProps> = ({}) => {
  return (
    <WaitForAuth>
      <DefaultDesktopLayout>{<PostController />}</DefaultDesktopLayout>
    </WaitForAuth>
  );
};

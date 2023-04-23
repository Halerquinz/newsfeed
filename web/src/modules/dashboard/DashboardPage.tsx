import { PageComponent } from "../../types/PageComponent";
import NoSSR from "../../ultils/noSSR";
import { WaitForAuth } from "../auth/WaitForAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { PostController } from "./PostController";

interface DashboardPageProps {}

export const DashboardPage: PageComponent<DashboardPageProps> = ({}) => {
  return (
    <NoSSR>
      <WaitForAuth>
        <HeaderController title="Dashboard" />
        <DefaultDesktopLayout>{<PostController />}</DefaultDesktopLayout>
      </WaitForAuth>
    </NoSSR>
  );
};

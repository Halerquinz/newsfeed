import { apiBaseUrl } from "../../lib/tests/constants";
import { HeaderController } from "../../modules/display/HeaderController";
import { PageComponent } from "../../types/PageComponent";
import { UserWithFollowInfo } from "../../types/util-types";
import NoSSR from "../../ultils/noSSR";
import { WaitForAuth } from "../auth/WaitForAuth";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";
import { MainLayout } from "../layouts/MainLayout";
import { FollowController } from "./FollowController";

interface UserPageProps {
  user: UserWithFollowInfo | null;
  id: string | string[] | undefined;
}

export const FollowPage: PageComponent<UserPageProps> = ({ user, id }) => {
  return (
    <NoSSR>
      <WaitForAuth>
        <HeaderController title="Danh sách theo dõi" />
        <MainLayout
          leftPanel={<AvailableUserController />}
          rightPanel={<ProfileBlockController />}
        >
          <FollowController
            displayName={`${user?.firstname} ${user?.lastname}`}
            username={user?.username!}
          />
        </MainLayout>
      </WaitForAuth>
    </NoSSR>
  );
};

FollowPage.getInitialProps = async ({ query }) => {
  const id = query.id;

  try {
    const res = await fetch(`${apiBaseUrl}/user/${id}`);
    const data = await res.json();
    const user: UserWithFollowInfo | null = data.data;

    return {
      id,
      user,
    };
  } catch {
    return {
      id,
      user: null,
    };
  }
};

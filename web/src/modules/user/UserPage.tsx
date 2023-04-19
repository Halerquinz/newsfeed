import React from "react";
import { apiBaseUrl } from "../../lib/tests/constants";
import { PageComponent } from "../../types/PageComponent";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import NoSSR from "../../ultils/noSSR";
import { ProfileHeader } from "../../ui/ProfileHeader";
import { User } from "../../types/util-types";
import { MiddlePanel } from "../layouts/GridPanels";
import { UserProfileController } from "./UserProfileController";

interface UserPageProps {
  user: User | null;
  id: string | string[] | undefined;
}

export const UserPage: PageComponent<UserPageProps> = ({ user, id }) => {
  return (
    <>
      {user ? (
        <HeaderController
          description={user.about}
          embed={{ image: user.profilePicture }}
          title={user.username}
        />
      ) : (
        <HeaderController />
      )}
      <NoSSR>
        <DefaultDesktopLayout>
          <MiddlePanel>
            <UserProfileController key={id as any} />
          </MiddlePanel>
        </DefaultDesktopLayout>
      </NoSSR>
    </>
  );
};

UserPage.getInitialProps = async ({ query }) => {
  const id = query.id;

  try {
    const res = await fetch(`${apiBaseUrl}/user/${id}`);
    const data = await res.json();
    const user: User | null = data.data;

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

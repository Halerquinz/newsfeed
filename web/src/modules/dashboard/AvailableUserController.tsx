import React, { useContext } from "react";
import { AvailableUser, AvailableUserWrapper } from "../../ui/AvailableUser";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { isServer } from "../../lib/tests/isServer";

interface AvailableUserControllerProps {
  children?: React.ReactNode;
}

interface userSummaryProfile {
  id: string;
  username: string;
  firstname: string;
  profilePicture: string;
}

type Data = {
  status: "success" | "fail";
  data: [userSummaryProfile];
};
export const Page: React.FC<{}> = ({}) => {
  const { conn } = useContext(AuthContext);
  const { data, isLoading } = useQuery<Data>({
    queryKey: ["/user/users/getProfile"],
  });

  const userData = data?.data;

  return (
    <React.Fragment>
      {userData?.map((user: any) => (
        <AvailableUser {...user} key={user.id} />
      ))}
    </React.Fragment>
  );
};

export const AvailableUserController: React.FC<
  AvailableUserControllerProps
> = ({}) => {
  const { conn } = useContext(AuthContext);

  if (!conn) {
    return null;
  }
  return (
    <AvailableUserWrapper>
      <Page />
    </AvailableUserWrapper>
  );
};

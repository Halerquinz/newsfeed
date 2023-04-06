import React, { useContext } from "react";
import { AvailableUser, AvailableUserWrapper } from "../../ui/AvailableUser";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { Spinner } from "../../ui/Spinner";
import { TitleText } from "../../ui/TitleText";
import { Data, UserSummaryProfile } from "../../types/util-types";

interface AvailableUserControllerProps {
  children?: React.ReactNode;
}

export const Page: React.FC<{}> = ({}) => {
  const { data, isLoading } = useQuery<Data<UserSummaryProfile[]>>({
    queryKey: ["/user/users/getProfile"],
    staleTime: Infinity,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      {data?.data?.map((user: UserSummaryProfile) => (
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
    <>
      <TitleText className="sticky mb-3" nameTitle="Người dùng" />
      <AvailableUserWrapper>
        <Page />
      </AvailableUserWrapper>
    </>
  );
};

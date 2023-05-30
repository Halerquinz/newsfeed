import React, { useContext } from "react";
import { AvailableUser, AvailableUserWrapper } from "../../ui/AvailableUser";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { Spinner } from "../../ui/Spinner";
import { TitleText } from "../../ui/TitleText";
import { Data, UserSummaryProfile } from "../../types/util-types";
import Link from "next/link";
import { ChatUser } from "../../ui/ChatUser";

interface ListUserChatControllerProps {
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
        <ChatUser {...user} key={user.id} />
      ))}
    </React.Fragment>
  );
};

export const ListUserChatController: React.FC<
  ListUserChatControllerProps
> = ({}) => {
  const { conn } = useContext(AuthContext);

  if (!conn) {
    return null;
  }

  return (
    <>
      <TitleText className="sticky mb-3" nameTitle="Tin nhắn" />
      <AvailableUserWrapper>
        <Page />
      </AvailableUserWrapper>
    </>
  );
};

import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { isServer } from "../../lib/tests/isServer";
import { Data, UserWithFollowInfo } from "../../types/util-types";
import { useGetUserWithFollowInfo } from "./useGetUserWithFollowInfo";

interface UserProfileControllerProps {}

export const UserProfileController: React.FC<
  UserProfileControllerProps
> = ({}) => {
  const { conn } = useContext(AuthContext);
  const { push, query, asPath } = useRouter();
  const { data, isLoading } = useQuery<Data<UserWithFollowInfo>>({
    queryKey: `/user/userWithFollowInfo/${query.id as string}`,
    enabled: typeof query.id === "string" && !!query.id && !isServer,
    refetchOnMount: "always",
  });
  console.log("re render");

  // const { data, isLoading } = useGetUserWithFollowInfo();

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return null;
  }

  if (data?.status && data.status.toLowerCase().includes("user not found")) {
    return <InfoText>Không tìm thấy người dùng</InfoText>;
  }
  if (data?.status === "fail" && data.msg) {
    return <InfoText>{data.msg}</InfoText>;
  }

  return (
    <>
      <UserProfile
        isCurrentUser={conn?.user?.id === data?.data?.id}
        user={data?.data!}
      />
      <div className={`flex pt-6 pb-6`}></div>
    </>
  );
};

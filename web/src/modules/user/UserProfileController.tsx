import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { isServer } from "../../lib/tests/isServer";
import { Data, User } from "../../types/util-types";

interface UserProfileControllerProps {}

export const UserProfileController: React.FC<
  UserProfileControllerProps
> = ({}) => {
  const { conn } = useContext(AuthContext);
  const { push, query } = useRouter();
  const { data, isLoading } = useQuery<Data<User>>({
    queryKey: `/user/${query.id as string}`,
    enabled: typeof query.id === "string" && !!query.id && !isServer,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <CenterLoader />;
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

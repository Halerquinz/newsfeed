import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SolidFriends } from "../../icons";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { Spinner } from "../../ui/Spinner";
import { MiddlePanel } from "../layouts/GridPanels";
import { AuthContext } from "../auth/AuthProvider";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { SingleUser } from "../../ui/user/SingleUser";
import { useQuery } from "react-query";
import { Data, FollowResponse } from "../../types/util-types";
import { isServer } from "../../lib/tests/isServer";
import { useUpdateQuery } from "../../shared-hooks/useUpdateQuery";

interface FollowingControllerProps {}

const Page = ({
  userId,
  isFollowing,
}: {
  isFollowing: boolean;
  userId: string;
}) => {
  const { conn } = useContext(AuthContext);
  const update = useUpdateQuery();
  // const {
  //   mutateAsync,
  //   isLoading: followLoading,
  //   variables,
  // } = useTypeSafeMutation("follow");

  const { data, isLoading } = useQuery<Data<FollowResponse>>({
    queryKey: `/follow`,
    enabled: !!userId && !isServer,
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <CenterLoader />;
  }

  // if (!data || data.data. === 0) {
  //   const styles = "text-primary-200 text-center";
  //   if (isFollowing)
  //     return (
  //       <div className={styles}>{t("pages.followList.followingNone")}</div>
  //     );
  //   else
  //     return <div className={styles}>{t("pages.followList.noFollowers")}</div>;
  // }

  return (
    <>
      {data?.data?.following.map((user) => (
        <div key={user.id} className="mb-6 flex items-center">
          <div className="flex">
            <SingleUser size="md" src={user.profilePicture} />
          </div>
          <div className="flex flex-1 px-4">
            <div className="flex w-full flex-col">
              <div className="block w-full max-w-md truncate text-primary-100">
                {`${user.firstname} ${user.lastname}`}
              </div>
              <div className="flex text-primary-200">@{user.username}</div>
            </div>
          </div>
          <div className="flex">
            {conn?.user?.username !== user.username && (
              <Button
                // loading={followLoading && variables?.[0] === user.id}
                onClick={async () => {
                  update(`/follow`, (d: Data<FollowResponse>) =>
                    !d
                      ? d
                      : {
                          status: "success",
                          data: {
                            ...d.data,
                            following: d.data?.following.map((u) =>
                              u.id === user.id
                                ? {
                                    ...u,
                                    youAreFollowing: !user.youAreFollowing,
                                  }
                                : u
                            ),
                          },
                        }
                  );
                  // await mutateAsync([user.id, !user.youAreFollowing]);
                  // updater(["getFollowList", ...vars], (x) =>
                  //   !x
                  //     ? x
                  //     : {
                  //         ...x,
                  //         users: x.users.map((u) =>
                  //           u.id === user.id
                  //             ? {
                  //                 ...u,
                  //                 numFollowers:
                  //                   u.numFollowers +
                  //                   (user.youAreFollowing ? -1 : 1),
                  //                 youAreFollowing: !user.youAreFollowing,
                  //               }
                  //             : u
                  //         ),
                  //       }
                  // );
                }}
                size="small"
                color={user.youAreFollowing ? "secondary" : "primary"}
                icon={user.youAreFollowing ? null : <SolidFriends />}
              >
                {user.youAreFollowing ? "Theo dõi" : "Hủy theo dõi"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export const FollowingController: React.FC<FollowingControllerProps> = ({}) => {
  const { pathname, query } = useRouter();
  const isFollowing = pathname.includes("/following");
  const userId = typeof query.id === "string" ? query.id : "";

  return (
    <MiddlePanel>
      <div className="mb-6 flex flex-col">
        <Page userId={userId} isFollowing={isFollowing} />
      </div>
    </MiddlePanel>
  );
};

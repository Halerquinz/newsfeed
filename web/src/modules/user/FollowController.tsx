import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { SolidFriends } from "../../icons";
import { followAction } from "../../lib/followAction";
import { isServer } from "../../lib/tests/isServer";
import { useUpdateQuery } from "../../shared-hooks/useUpdateQuery";
import {
  Data,
  FollowerResponse,
  FollowingResponse,
} from "../../types/util-types";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { SingleUser } from "../../ui/user/SingleUser";
import { AuthContext } from "../auth/AuthProvider";
import { MiddlePanel } from "../layouts/GridPanels";
import Link from "next/link";

interface FollowingControllerProps {
  displayName: string;
  username: string;
}

const FollowingPage = ({ userId }: { userId: string }) => {
  const { conn } = useContext(AuthContext);
  const update = useUpdateQuery();
  const { data, isLoading } = useQuery<Data<FollowingResponse>>({
    queryKey: `/follow/getFollowing/${userId}`,
    enabled: !!userId && !isServer,
    refetchOnMount: "always",
  });
  const followFn = followAction();
  const { mutateAsync: follow, isLoading: followLoading } =
    useMutation(followFn);

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data || data.data?.following.length == 0) {
    const cn = "text-primary-200 text-center";
    return <div className={cn}>Không có người theo dõi</div>;
  }

  return (
    <>
      {data?.data?.following.map((user) => (
        <div key={user.id} className="mb-6 flex items-center">
          <div className="flex">
            <SingleUser size="md" src={user.profilePicture} />
          </div>
          <div className="flex flex-1 px-4">
            <Link href={`/u/${user.id}`}>
              <div className="flex w-full flex-col">
                <div className="block w-full max-w-md truncate text-primary-100">
                  {`${user.firstname} ${user.lastname}`}
                </div>
                <div className="flex text-primary-200">@{user.username}</div>
              </div>
            </Link>
          </div>
          <div className="flex">
            {conn?.user?.username !== user.username && (
              <Button
                loading={followLoading}
                onClick={async () => {
                  await follow(user.id);
                  update(
                    `/follow/getFollowing/${userId}`,
                    (d: Data<FollowingResponse>) =>
                      !d
                        ? d
                        : {
                            status: "success",
                            data: {
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
                }}
                size="small"
                color={user.youAreFollowing ? "secondary" : "primary"}
                icon={user.youAreFollowing ? null : <SolidFriends />}
              >
                {user.youAreFollowing ? "Bỏ theo dõi " : "Theo dõi"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
const FollowerPage = ({ userId }: { userId: string }) => {
  const { conn } = useContext(AuthContext);
  const update = useUpdateQuery();
  const { data, isLoading } = useQuery<Data<FollowerResponse>>({
    queryKey: `/follow/getFollowed/${userId}`,
    enabled: !!userId && !isServer,
    refetchOnMount: "always",
  });
  const followFn = followAction();
  const { mutateAsync: follow, isLoading: followLoading } =
    useMutation(followFn);

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data || data.data?.followed.length == 0) {
    const cn = "text-primary-200 text-center";
    return <div className={cn}>Không có người theo dõi</div>;
  }

  return (
    <>
      {data?.data?.followed.map((user) => (
        <div key={user.id} className="mb-6 flex items-center">
          <div className="flex">
            <SingleUser size="md" src={user.profilePicture} />
          </div>
          <div className="flex flex-1 px-4">
            <Link href={`/u/${user.id}`}>
              <div className="flex w-full flex-col">
                <div className="block w-full max-w-md truncate text-primary-100">
                  {`${user.firstname} ${user.lastname}`}
                </div>
                <div className="flex text-primary-200">@{user.username}</div>
              </div>
            </Link>
          </div>
          <div className="flex">
            {conn?.user?.username !== user.username && (
              <Button
                loading={followLoading}
                onClick={async () => {
                  await follow(user.id);
                  update(
                    `/follow/getFollowed/${userId}`,
                    (d: Data<FollowerResponse>) =>
                      !d
                        ? d
                        : {
                            status: "success",
                            data: {
                              followed: d.data?.followed.map((u) =>
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
                }}
                size="small"
                color={user.youAreFollowing ? "secondary" : "primary"}
                icon={user.youAreFollowing ? null : <SolidFriends />}
              >
                {user.youAreFollowing ? "Bỏ theo dõi " : "Theo dõi"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export const FollowController: React.FC<FollowingControllerProps> = ({
  displayName,
  username,
}) => {
  const { pathname, query } = useRouter();
  const isFollowing = pathname.includes("/following");
  const currentTab = isFollowing ? "following" : "follower";
  const [activeTab, setActiveTab] = useState(currentTab);

  const { push } = useRouter();
  const userId = typeof query.id === "string" ? query.id : "";

  return (
    <MiddlePanel
      stickyChildren={
        <>
          <div className="mb-5 ml-4 flex flex-col justify-between">
            <TitleText nameTitle={displayName} />
            <span className="break-all text-left text-lg text-primary-300">
              {`@${username}`}
            </span>
          </div>
          <div className={`mb-5 flex w-full items-center justify-around`}>
            <button
              className={`focus:outline-no-chrome border-b-2 py-1 text-base font-bold text-primary-100 transition hover:opacity-75
               ${
                 activeTab === "follower"
                   ? `border-accent `
                   : `border-primary-900`
               }
          `}
              onClick={() => {
                push(`/u/${userId}/follower`, undefined, { shallow: true });
                setActiveTab("follower");
              }}
            >
              Người theo dõi
            </button>

            <button
              className={`focus:outline-no-chrome border-b-2 py-1 text-base font-bold text-primary-100 transition
            hover:opacity-75
            ${
              activeTab === "following"
                ? `border-accent `
                : `border-primary-900`
            }
            `}
              onClick={() => {
                push(`/u/${userId}/following`, undefined, { shallow: true });
                setActiveTab("following");
              }}
            >
              Đang theo dõi
            </button>
          </div>
        </>
      }
    >
      <div className="mb-6 flex flex-col">
        {activeTab === "following" ? (
          <FollowingPage userId={userId} />
        ) : (
          <FollowerPage userId={userId} />
        )}
      </div>
    </MiddlePanel>
  );
};

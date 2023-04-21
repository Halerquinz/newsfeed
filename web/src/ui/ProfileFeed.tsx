import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../modules/auth/AuthProvider";
import { CreatePostModal } from "../modules/dashboard/CreatePostModal";
import { MiddlePanel } from "../modules/layouts/GridPanels";
import { useScreenType } from "../shared-hooks/useScreenType";
import { Data, PostsResponse, Post } from "../types/util-types";
import { Button } from "./Button";
import { CenterLoader } from "./CenterLoader";
import { PostCard } from "./PostCard";

interface ProfileFeedProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  currentUserId: number;
}

const Page: React.FC<{
  cursor: string;
  limit: number;
  onLoadMore: (c: string) => void;
  isLastPage: boolean;
  currentUserId: number;
}> = ({ cursor, limit, currentUserId, onLoadMore, isLastPage }) => {
  const { push } = useRouter();
  const { data, isLoading } = useQuery<Data<PostsResponse>>({
    queryKey: ["/post/get-posts/user", cursor, limit, currentUserId],
    staleTime: Infinity,
    refetchOnMount: "always",
    refetchInterval: 10000,
    // Magic React Query
  });

  console.log(data);
  const { setQueryData } = useQueryClient();

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <>
      {data?.data?.data?.map((post: Post) => (
        <PostCard
          {...post}
          key={post.id}
          onClick={() => {
            push(`/post/${post.id}`);
          }}
        />
      ))}
      {isLastPage && data?.data?.nextCursor ? (
        <div className={`flex justify-center py-5`}>
          <Button
            size="small"
            onClick={() => {
              onLoadMore(data?.data!.nextCursor);
            }}
          >
            Tải thêm
          </Button>
        </div>
      ) : null}
    </>
  );
};

export const ProfileFeed: React.FC<ProfileFeedProps> = ({
  currentUserId,
  className,
}) => {
  const [cursors, setCursors] = useState<string[]>([""]);
  const { conn } = useContext(AuthContext);
  const screenType = useScreenType();

  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }

  if (!conn) {
    return null;
  }

  return (
    <div className={`mt-2 flex w-full flex-1 flex-col ${className}`}>
      <div className={`flex flex-1 flex-col ${mb}`}>
        <div className="flex flex-col space-y-4">
          {cursors.map((cursor, i) => (
            <Page
              limit={10}
              key={i}
              cursor={cursor}
              onLoadMore={(c) => setCursors([...cursors, c])}
              isLastPage={i === cursors.length - 1}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

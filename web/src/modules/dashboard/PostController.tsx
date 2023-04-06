import React, { useContext, useState } from "react";
import { PostHeader } from "../../ui/PostHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { PostCard } from "../../ui/PostCard";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "react-query";
import { isServer } from "../../lib/tests/isServer";
import { Data, Post, PostsResponse } from "../../types/util-types";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";

interface PostControllerProps {}

const Page = ({
  cursor,
  limit,
  onLoadMore,
  isLastPage,
}: {
  cursor: string;
  limit: number;
  onLoadMore: (c: string) => void;
  isLastPage: boolean;
}) => {
  const { data, isLoading } = useQuery<Data<PostsResponse>>({
    queryKey: ["/post", cursor, limit],
    staleTime: Infinity,
    enabled: !isServer,
    refetchOnMount: "always",
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <>
      {data?.data.data.map((post: Post) => (
        <PostCard {...post} key={post.id} />
      ))}
      {isLastPage && data?.data.nextCursor ? (
        <div className={`flex justify-center py-5`}>
          <Button
            size="small"
            onClick={() => {
              onLoadMore(data.data.nextCursor);
            }}
          >
            Tải thêm
          </Button>
        </div>
      ) : null}
    </>
  );
};

export const PostController: React.FC<PostControllerProps> = ({}) => {
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
    <MiddlePanel
      stickyChildren={
        <PostHeader title="Bảng tin" actionTitle="Tạo bài viết" />
      }
    >
      <div className={`flex flex-1 flex-col ${mb}`}>
        <div className="flex flex-col space-y-4">
          {cursors.map((cursor, i) => (
            <Page
              limit={5}
              key={i}
              cursor={cursor}
              onLoadMore={(c) => setCursors([...cursors, c])}
              isLastPage={i === cursors.length - 1}
            />
          ))}
        </div>
      </div>
    </MiddlePanel>
  );
};

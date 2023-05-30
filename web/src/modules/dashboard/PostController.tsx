import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { Data, Post, PostsResponse } from "../../types/util-types";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { PostCard } from "../../ui/PostCard";
import { PostHeading } from "../../ui/PostHeading";
import { AuthContext } from "../auth/AuthProvider";
import { MiddlePanel } from "../layouts/GridPanels";
import { CreatePostModal } from "./CreatePostModal";
import { isServer } from "../../lib/tests/isServer";
import { useUpdateQuery } from "../../shared-hooks/useUpdateQuery";

interface PostControllerProps {}

const Page: React.FC<{
  cursor: string;
  limit: number;
  onLoadMore: (c: string) => void;
  isLastPage: boolean;
}> = ({ cursor, limit, onLoadMore, isLastPage }) => {
  const { push } = useRouter();
  const { data, isLoading } = useQuery<Data<PostsResponse>>({
    queryKey: ["/post", cursor, limit],
    staleTime: Infinity,
    enabled: !isServer,
    refetchOnMount: "always",
    refetchInterval: 10000,
    // Magic React Query
  });

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

export const PostController: React.FC<PostControllerProps> = () => {
  const [cursors, setCursors] = useState<string[]>([""]);
  const [modal, setModal] = useState(false);
  const { conn } = useContext(AuthContext);
  const update = useUpdateQuery();
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
        <PostHeading
          title="Bảng tin"
          actionTitle="Tạo bài viết"
          onActionClicked={() => setModal(true)}
        />
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
      {modal ? (
        <CreatePostModal
          onRequestClose={() => {
            setModal(false);
          }}
        />
      ) : null}
    </MiddlePanel>
  );
};

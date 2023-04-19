import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { CommentDetail, Data } from "../types/util-types";

export const useGetPostComments = () => {
  const { query } = useRouter();

  const postId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQuery<Data<CommentDetail[]>>({
    queryKey: `/comment/${postId}`,
    enabled: postId !== "",
    refetchOnMount: true,
    refetchInterval: 10000,
  });

  return {
    data,
    isLoading,
  };
};

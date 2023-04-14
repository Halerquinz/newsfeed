import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Data, PostDetail } from "../../types/util-types";

export const useGetPostByQueryParam = () => {
  const { query } = useRouter();

  const postId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQuery<Data<PostDetail>>({
    queryKey: `/post/get_post/${postId}`,
    enabled: postId !== "",
    refetchOnMount: true,
  });

  return {
    data,
    isLoading,
  };
};

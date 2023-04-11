import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { isServer } from "../../lib/tests/isServer";
import { AuthContext } from "../auth/AuthProvider";
import { Data, PostDetail } from "../../types/util-types";

export const useGetPostByQueryParam = () => {
  const { query } = useRouter();
  const { conn } = useContext(AuthContext);

  if (!query.id) {
    return { data: null, isLoading: true };
  }

  const postId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useQuery<Data<PostDetail>>({
    queryKey: [`/post/get_post/${postId}`],
    enabled: !!conn && !isServer,
    refetchOnMount: true,
  });


  // useEffect(() => {

  // }, [postId]);

  return {
    data,
    isLoading,
  };
};

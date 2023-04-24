import { GetServerSideProps } from "next";
import { PostPage } from "../../../modules/post/PostPage";

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let previousRoute = context.req.headers?.referer || undefined;

  if (previousRoute === undefined) {
    previousRoute = "/dash";
  }

  return {
    props: { previousRoute },
  };
};

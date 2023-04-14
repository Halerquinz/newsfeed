import { useQuery } from "react-query";
import { PageComponent } from "../../types/PageComponent";
import { PostOpenGraphPreview } from "./PostOpenGraphPreview";
import { WaitForAuth } from "../auth/WaitForAuth";
import NoSSR from "../../ultils/noSSR";
import { MainLayout } from "../layouts/MainLayout";
import { AvailableUser } from "../../ui/AvailableUser";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import { useRouter } from "next/router";
import { useGetPostByQueryParam } from "./useGetPostByQueryParam";
import { useState } from "react";
import { PostPanelController } from "./PostPanelController";
import { Data, PostDetail } from "../../types/util-types";
import { PostCommentController } from "./comment/PostCommentController";
import { PostComment } from "./comment/PostComment";

interface PostPageProps {
  id?: string | string[] | undefined;
}

export const PostPage: PageComponent<PostPageProps> = ({ id }) => {
  const [postData, setPostData] = useState(
    undefined as Data<PostDetail> | undefined
  );

  return (
    <PostOpenGraphPreview>
      <NoSSR>
        <WaitForAuth>
          <MainLayout
            leftPanel={<AvailableUserController />}
            rightPanel={<PostCommentController data={postData!} />}
          >
            <PostPanelController setPostData={setPostData} />
          </MainLayout>
        </WaitForAuth>
      </NoSSR>
    </PostOpenGraphPreview>
  );
};

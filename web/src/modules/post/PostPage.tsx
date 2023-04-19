import { useState } from "react";
import { PageComponent } from "../../types/PageComponent";
import { Data, PostDetail } from "../../types/util-types";
import NoSSR from "../../ultils/noSSR";
import { WaitForAuth } from "../auth/WaitForAuth";
import { AvailableUserController } from "../dashboard/AvailableUserController";
import { MainLayout } from "../layouts/MainLayout";
import { PostOpenGraphPreview } from "./PostOpenGraphPreview";
import { PostPanelController } from "./PostPanelController";
import { PostCommentController } from "./comment/PostCommentController";
import { ProfileBlockController } from "../dashboard/ProfileBlockController";

interface PostPageProps {}

export const PostPage: PageComponent<PostPageProps> = ({}) => {
  const [postData, setPostData] = useState(
    undefined as Data<PostDetail> | undefined
  );

  return (
    <PostOpenGraphPreview>
      <NoSSR>
        <WaitForAuth>
          <MainLayout
            leftPanel={<AvailableUserController />}
            rightPanel={<ProfileBlockController />}
          >
            <PostPanelController setPostData={setPostData} />
          </MainLayout>
        </WaitForAuth>
      </NoSSR>
    </PostOpenGraphPreview>
  );
};

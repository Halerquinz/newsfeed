import React, { useContext } from "react";
import { PostHeader } from "../../ui/PostHeader";
import { MiddlePanel } from "../layouts/GridPanels";
import { useRouter } from "next/router";
import { PostCard } from "../../ui/PostCard";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { AuthContext } from "../auth/AuthProvider";

interface PostControllerProps {}

const Page = ({}) => {
  const { push } = useRouter();
  const { conn } = useContext(AuthContext);

  // fetch all page from db
  // if isLoading return CenterLoader
  // if !data return null
  // map through data and render PostCard

  if (!conn) {
    return null;
  }

  const data = {
    avatar:
      "https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.15752-9/336924572_166485552929782_3206191179659229093_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=BTEZsfvJI10AX_HBnqd&_nc_ht=scontent.fsgn8-3.fna&oh=03_AdR-oaxb25vrkgWc0C8z5FXY7ME3TRpc_OqG3LQMy8iG0A&oe=6448F5A7",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    createdDate: "15h",
    image: "https://i.ytimg.com/vi/lIK2OxsddfQ/hqdefault.jpg",
    likes: 500,
    comment: 10,
    username: "@phuonguyen88",
    fullname: "Phuong Uyen",
  };

  return (
    <>
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image={data.image}
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image="https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_12_19/downloaderla-639f7d3480955-3205.jpg"
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image="https://yt3.googleusercontent.com/kwg4fYoY0BsJFOQDoPndVMfMBuYws9YJnGcHqAXR4uTV5ijGPiYGmXvvQC4oAV_E9k0kTgkP5w=s900-c-k-c0x00ffffff-no-rj"
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image={data.image}
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image={data.image}
        fullname={data.fullname}
      />
      <PostCard
        onClick={() => push("/dash")}
        avatar={data.avatar}
        comments={data.comment}
        createdDate={data.createdDate}
        desc={data.desc}
        likes={data.likes}
        username={data.username}
        image={data.image}
        fullname={data.fullname}
      />
    </>
  );
};

export const PostController: React.FC<PostControllerProps> = ({}) => {
  // if not login return null
  const screenType = useScreenType();
  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }
  return (
    <MiddlePanel stickyChildren={<PostHeader />}>
      <div className={`flex flex-1 flex-col ${mb}`}>
        <div className="flex flex-col space-y-4">
          <Page />
        </div>
      </div>
    </MiddlePanel>
  );
};

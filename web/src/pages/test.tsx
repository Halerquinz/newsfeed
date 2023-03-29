import React from "react";
import { PostController } from "../modules/dashboard/PostController";
import dynamic from "next/dynamic";
import NoSSR from "../ultils/noSSR";

interface testProps {}

const Test: React.FC<testProps> = ({}) => {
  return (
    <div>
      <NoSSR>
        <PostController />;
      </NoSSR>
    </div>
  );
};

export default Test;

import React from "react";
import { PostController } from "../modules/dashboard/PostController";
import NoSSR from "../ultils/noSSR";
import { apiBaseUrl } from "../lib/tests/constants";

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

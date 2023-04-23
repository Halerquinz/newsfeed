import React from "react";
import Header from "next/head";
import { NextPage } from "next";

export interface HeaderControllerProps {
  title?: string;
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Sky",
}) => {
  const titleInside = title
    ? `${title.length > 20 ? `${title.slice(0, 20)}...` : title} | Sky`
    : `Sky`;
  return (
    <Header>
      {/* {title ? <title>{title} | Sky</title> : <title>Sky</title>}
       */}
      <title>{titleInside}</title>
      <meta name="description" content={description} />
      <meta
        name="og:image"
        content={`data:image/jpeg;base64,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`}
      />
    </Header>
  );
};

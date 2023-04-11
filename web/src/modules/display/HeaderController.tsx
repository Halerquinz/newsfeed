import React from "react";
import Header from "next/head";
import { NextPage } from "next";
import { baseUrl } from "../../lib/tests/constants";

export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Sky",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  const titleInside = title ? `${title} | Sky` : `Sky`;
  return (
    <Header>
      {/* {title ? <title>{title} | Sky</title> : <title>Sky</title>}
       */}
      <title>{titleInside}</title>
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`Sky, ${additionalKeywords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "Sky"} />
          <meta
            name="og:type"
            content={owner ? "music.radio_station" : "website"}
          />
          {owner ? <meta name="music:creator" content={owner} /> : ""}
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="Sky" />
          <meta
            name="og:image"
            content={embed.image ? embed.image : `${baseUrl}/img/doge.png`}
          />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};

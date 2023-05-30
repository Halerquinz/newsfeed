import React, { useState } from "react";
import { SearchBar } from "../../ui/Search/SearchBar";
import { useMediaQuery } from "react-responsive";
import usePageVisibility from "../../shared-hooks/usePageVisibility";
import { useDebounce } from "use-debounce";
import { useQuery } from "react-query";
import {
  Data,
  PostsResponse,
  UserSummaryProfile,
} from "../../types/util-types";
import { useTokenStore } from "../auth/useTokenStore";
import { apiBaseUrl } from "../../lib/tests/constants";
import { isServer } from "../../lib/tests/isServer";
import Downshift from "downshift";
import { useRouter } from "next/router";
import { UserSummaryCard } from "../../ui/UserSummaryCard";
import { InfoText } from "../../ui/InfoText";
import { SearchOverlay } from "../../ui/Search/SearchOverlay";
import { UserSearchResult } from "../../ui/Search/SearchResult/UserSearchResult";
import { test } from "node:test";

interface SearchBarControllerProps {}

export const SearchBarController: React.FC<SearchBarControllerProps> = ({}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const { token } = useTokenStore.getState();
  const [rawText, setText] = useState("");
  const visible = usePageVisibility();
  const [text] = useDebounce(rawText, 200);
  const { push } = useRouter();
  const isOverflowing = useMediaQuery({ maxWidth: 475 });
  let enabled = false;

  if (text && text.trim().length >= 1) {
    enabled = true;
  }

  const { data, isLoading } = useQuery<Data<UserSummaryProfile[]>>({
    // queryKey: ["/user/users/search"],
    queryFn: () =>
      fetch(`${apiBaseUrl}/user/users/search`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `beared ${token}`,
          text,
        },
      }).then((res) => res.json()),
    enabled,
    refetchInterval: 1000,
  });

  const results = data ? data.data : [];

  return (
    <Downshift
      onChange={(selection) => {
        if (!selection) {
          return;
        }
        if ("username" in selection) {
          push(`/u/[username]`, `/u/${selection.id}`);
          return;
        }
      }}
      onInputValueChange={(v) => {
        if (visible) {
          setText(v);
        }
      }}
      itemToString={(item) => {
        if (!item) {
          return "";
        } else if ("username" in item) {
          return item.username;
        }
        return item.name;
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div className="relative z-10 flex w-full flex-col">
          <SearchBar
            {...getInputProps()}
            value={rawText}
            placeholder={"Tìm kiếm người dùng"}
            isLoading={isLoading}
          />
          {isOpen ? (
            <SearchOverlay
              {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
            >
              <ul
                className="mb-2 mt-7 w-full overflow-y-auto rounded-b-8 bg-primary-800 px-2"
                {...getMenuProps({ style: { top: 0 } })}
              >
                {data?.data!.length === 0 || !data ? (
                  <InfoText className="p-3">
                    Không có người dùng thích hợp{" "}
                  </InfoText>
                ) : null}

                {results?.map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.id,
                      index,
                      item,
                    })}
                  >
                    <UserSearchResult
                      user={item}
                      className={
                        highlightedIndex === index
                          ? "bg-primary-700"
                          : "bg-primary-800"
                      }
                    />
                  </li>
                ))}
              </ul>
            </SearchOverlay>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

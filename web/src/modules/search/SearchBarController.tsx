import React, { useState } from "react";
import { SearchBar } from "../../ui/Search/SearchBar";

interface SearchBarControllerProps {}

export const SearchBarController: React.FC<SearchBarControllerProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative z-10 flex w-full flex-col">
      <SearchBar isLoading={isLoading} />
    </div>
  );
};

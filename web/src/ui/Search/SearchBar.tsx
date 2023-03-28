import React from "react";
import SolidSearch from "../../icons/SolidSearch";
import { Input } from "../Input";
import { Spinner } from "../Spinner";

interface SearchBarProps {
  mobile?: boolean;
  className?: string;
  inputClassName?: "string";
  props?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  mobile,
  className,
  inputClassName,
  isLoading = false,
  ...props
}) => {
  return (
    <div
      className={`flex w-full items-center rounded-lg bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 ${
        mobile ? "px-4" : ""
      } ${className}`}
    >
      {!mobile && (
        <div className="pointer-events-none mx-4 flex h-full items-center">
          <SolidSearch />
        </div>
      )}

      <Input autoFocus className={`${inputClassName} pl-0`} {...props} />
      {isLoading && (
        <div
          className={`pointer-events-none flex h-full items-center ${
            !mobile && "mx-4"
          }`}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

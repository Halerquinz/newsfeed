import React, { useEffect, useState } from "react";
import { SolidCaretRight } from "../icons";

interface PostHeaderProps {
  onTitleClick?: () => void;
  title: string;
  name: string;
  description: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  onTitleClick,
  title,
  name,
  description,
}) => {
  const [open, setOpen] = useState(true);
  const [hasDescription, setHasDescription] = useState<boolean>(false);

  useEffect(() => {
    setHasDescription(description.trim().length > 0);
  }, [description]);

  return (
    <div
      className={`flex w-full flex-col rounded-t-8 border-b border-primary-600 bg-primary-800 p-4 ${
        hasDescription ? "cursor-pointer" : ""
      }`}
      onClick={hasDescription ? () => setOpen(!open) : undefined}
    >
      <div className={`mb-2 flex text-primary-100`}>
        <button
          onClick={onTitleClick}
          className={`flex flex-1 truncate text-xl font-bold`}
        >
          {title}
        </button>
        {hasDescription && (
          <button className="flex" onClick={() => setOpen(!open)}>
            <SolidCaretRight
              className={`transform ${
                open ? "mt-auto -rotate-90" : "mr-auto rotate-90"
              } cursor-pointer`}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      <div className={`flex text-sm text-primary-200`}>
        <span style={{ marginRight: 4 }}>with</span>{" "}
        <span
          className={`font-bold text-primary-100 hover:underline`}
          style={{ marginRight: 4 }}
        >
          {name}
        </span>
      </div>
      {/* {open ? <div className="text-primary-100 mt-4">{description}</div> : null} */}

      {open && description?.trim() && (
        <div
          className="mt-4 overflow-y-auto break-words"
          style={{ maxHeight: "100px" }}
        ></div>
      )}
    </div>
  );
};

import React, { MouseEventHandler, ReactNode } from "react";

export interface BaseOverlayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  actionButton?: string;
  onActionButtonClicked?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  overlay?: ReactNode;
}

export const BaseOverlay: React.FC<BaseOverlayProps> = ({
  children,
  title,
  actionButton,
  overlay,
  onActionButtonClicked,
  ...props
}) => {
  return (
    <div
      className="relative flex w-full flex-col overflow-hidden rounded-8 border border-primary-700 bg-primary-800"
      {...props}
    >
      {overlay ? overlay : ""}
      {title && (
        <div className="flex items-center border-b border-primary-600 px-4 py-3">
          <h4 className="text-primary-100">{title}</h4>
        </div>
      )}

      <div className="flex flex-col text-primary-100">{children}</div>

      {actionButton && (
        <button
          // className="flex bg-primary-700 px-4 font-bold text-primary-100 outline-none"
          className="flex w-full cursor-pointer items-center px-4 py-4 text-primary-100 md:border-none
       md:py-2 md:hover:bg-primary-700"
          style={{
            paddingTop: 8,
            paddingBottom: 12,
            borderRadius: "0 0 8px 8px",
          }}
          onClick={onActionButtonClicked}
        >
          {actionButton}
        </button>
      )}
    </div>
  );
};

import React from "react";

export const NativeSelect: React.FC<
  React.ComponentPropsWithoutRef<"select">
> = ({ children, className, ...props }) => {
  return (
    <select
      className={`h-full appearance-none rounded-8 bg-primary-700 bg-auto bg-no-repeat px-4 py-2 text-primary-100 placeholder-primary-300 focus:outline-none ${className}`}
      style={{
        backgroundImage:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAuNUw1IDUuNUwxMCAwLjVIMFoiIGZpbGw9IiNERUUzRUEiLz4KPC9zdmc+Cgo=')",
        backgroundPosition: "right 8.5px center",
      }}
      {...props}
    >
      {children}
    </select>
  );
};

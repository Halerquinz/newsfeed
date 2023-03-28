import React from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string;
  textarea?: boolean;
  rows?: number;
  transparent?: boolean;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, rows, error, transparent, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-700`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

    return textarea ? (
      <textarea
        className={cn}
        ref={ref as any}
        rows={rows}
        {...(props as any)}
      />
    ) : (
      <input className={cn} ref={ref} {...props} />
    );
  }
);

Input.displayName = "Input";

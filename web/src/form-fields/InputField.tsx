import { useField } from "formik";
import React from "react";
import { Input } from "../ui/Input";
import { InputErrorMsg } from "../ui/InputErrorMsg";

export const InputField: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: string;
    errorMsg?: string;
    label?: string;
    textarea?: boolean;
    altErrorMsg?: string;
    rows?: number;
  }
> = ({ label, textarea, errorMsg, ref: _, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`block h-full w-full ${className}`}>
      {label ? (
        <div className={`mb-2 flex text-primary-300`}>{label}</div>
      ) : null}
      <Input
        error={meta.error as any}
        textarea={textarea}
        {...field}
        {...props}
      />
      {meta.error && meta.touched ? (
        <div className={`mt-1 flex`}>
          <InputErrorMsg>{errorMsg || meta.error}</InputErrorMsg>
        </div>
      ) : null}
    </div>
  );
};

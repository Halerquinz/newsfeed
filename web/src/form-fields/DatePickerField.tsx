import { useField, useFormikContext } from "formik";
import React from "react";
import { Input } from "../ui/Input";
import { InputErrorMsg } from "../ui/InputErrorMsg";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi"; // the locale you want
registerLocale("vi", vi); // register it with the name you want

export const DatePickerField: React.FC<
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
  const { setFieldValue } = useFormikContext();

  return (
    <div className={`block h-full w-full ${className}`}>
      {label ? (
        <div className={`mb-2 flex text-primary-300`}>{label}</div>
      ) : null}
      <DatePicker
        locale="vi"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        className="w-full rounded-8 bg-primary-700 py-2 px-4 text-primary-100 placeholder-primary-300"
        maxDate={new Date()}
        dateFormat="dd-MM-yyyy"
      />
      {meta.error && meta.touched ? (
        <div className={`mt-1 flex`}>
          <InputErrorMsg>{errorMsg || meta.error}</InputErrorMsg>
        </div>
      ) : null}
    </div>
  );
};

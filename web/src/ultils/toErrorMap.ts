import { FieldError } from "../types/FieldError";

export const toErrorMap = ({ field, msg }: FieldError) => {
  const formatErr: Record<string, string> = {};
  formatErr[field] = msg;

  return formatErr;
};

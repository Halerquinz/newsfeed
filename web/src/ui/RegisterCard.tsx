import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../form-fields/InputField";
import WinCloseIcon from "../icons/WinCloseIcon";
import { Button } from "./Button";
import { NativeSelect } from "./NativeSelect";
import { RegisterForm } from "./RegisterForm";

interface RegisterCardProps {
  closeAction: () => void;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({ closeAction }) => {
  const { push } = useRouter();

  return (
    <>
      <div className="flex">
        <span className="text-3xl font-bold text-primary-100">Đăng kí</span>
        <Button onClick={closeAction} size="small" className="ml-auto">
          <WinCloseIcon className="ml-auto" />
        </Button>
      </div>
      <RegisterForm />
    </>
  );
};

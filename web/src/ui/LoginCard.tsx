import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useReducer } from "react";
import { InputField } from "../form-fields/InputField";
import WinCloseIcon from "../icons/WinCloseIcon";
import { toErrorMap } from "../ultils/toErrorMap";
import { Button } from "./Button";
import { LoginForm } from "./LoginForm";

interface LoginCardProps {
  closeAction: () => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ closeAction }) => {
  return (
    <>
      <div className="flex">
        <span className="text-3xl font-bold text-primary-100">Đăng nhập</span>
        <Button onClick={closeAction} size="small" className="ml-auto">
          <WinCloseIcon className="ml-auto" />
        </Button>
      </div>
      <LoginForm />
    </>
  );
};

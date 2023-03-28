import React, { useCallback, useState } from "react";
import LgLogo from "../../icons/LgLogo";
import { Button } from "../../ui/Button";
import { LoginForm } from "../../ui/LoginForm";
import { RegisterForm } from "../../ui/RegisterForm";
import { MiddleLoginPanel } from "../layouts/LoginPanels";

interface LoginPageProps {}

interface LoginButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      className="mt-2 justify-center py-3 text-base"
      color={"primary"}
    >
      {children}
    </Button>
  );
};

export const LoginPageTest: React.FC<LoginPageProps> = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  console.log("render");

  let middle = null;
  if (!showLogin && !showRegister) {
    middle = (
      <>
        <div className="z-10 m-auto flex w-full flex-col gap-5 bg-primary-800 p-6 sm:w-400 sm:rounded-8">
          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-primary-100">
              Chào mừng
            </span>
            <div className="flex-wrap text-primary-100">
              Bằng cách nhấp vào Đăng nhập, bạn đồng ý với&nbsp;
              <a
                href="/privacy-policy.html"
                className="text-accent hover:underline"
              >
                Chính sách quyền riêng tư
              </a>
              &nbsp;và &nbsp;
              <a href="/terms.html" className="text-accent hover:underline">
                Điều khoản dịch vụ
              </a>
              {""} của chúng tôi.
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <LoginButton onClick={() => setShowLogin(!showLogin)}>
              Đăng nhập
            </LoginButton>
            <LoginButton onClick={() => setShowRegister(!showRegister)}>
              Tạo tài khoản mới
            </LoginButton>
          </div>
        </div>
      </>
    );
  }
  const closeLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  const closeRegister = useCallback(() => {
    setShowRegister(false);
  }, []);

  if (showLogin) {
    middle = <LoginForm closeAction={closeLogin} />;
  }

  if (showRegister) {
    middle = <RegisterForm closeAction={closeRegister} />;
  }

  return (
    <>
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateRows: "1fr auto 1fr",
        }}
      >
        <div className="hidden sm:flex" />
        <div className="flex self-center justify-self-center sm:hidden">
          <LgLogo />
        </div>

        {middle}
        <div className="absolute bottom-0 mt-auto flex w-full flex-row items-center justify-between px-5 py-5 sm:px-7">
          <div className="hidden sm:flex">
            <LgLogo />
          </div>
          <div className="flex flex-row gap-6 text-primary-300">
            <a href="/privacy-policy.html" className="hover:text-primary-200">
              Chính sách quyền riêng tư
            </a>
            <a href="" className="ml-2 hover:text-primary-200">
              Báo cáo lỗi
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

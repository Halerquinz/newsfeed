import React from "react";
import { Button } from "./Button";

interface WelcomeCardProps {
  openActionLogin: () => void;
  openActionRegister: () => void;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  openActionLogin,
  openActionRegister,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-primary-100">Chào mừng</span>
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
        <Button onClick={openActionLogin}>Đăng nhập</Button>
        <Button onClick={openActionRegister}>Tạo tài khoản mới</Button>
      </div>
    </>
  );
};

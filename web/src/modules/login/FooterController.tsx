import React from "react";
import LgLogo from "../../icons/LgLogo";

interface FooterControllerProps {}

export const FooterController: React.FC<FooterControllerProps> = ({}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

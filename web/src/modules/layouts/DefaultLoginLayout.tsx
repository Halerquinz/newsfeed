import React from "react";
import { FooterController } from "../login/FooterController";
import { HeaderController } from "../login/HeaderController";
import { LoginLayout } from "./LoginLayout";

interface DefaultLoginLayoutProps {
  children: React.ReactNode;
}

export const DefaultLoginLayout: React.FC<DefaultLoginLayoutProps> = ({
  children,
}) => {
  return (
    <LoginLayout
      topPanel={<HeaderController />}
      bottomPanel={<FooterController />}
    >
      {children}
    </LoginLayout>
  );
};

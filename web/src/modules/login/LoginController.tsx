import React, { useCallback, useState } from "react";
import { LoginCard } from "../../ui/LoginCard";
import { LoginForm } from "../../ui/LoginForm";
import { RegisterCard } from "../../ui/RegisterCard";
import { WelcomeCard } from "../../ui/WelcomeCard";
import { MiddleLoginPanel } from "../layouts/LoginPanels";

interface LoginControllerProps {}

export const LoginController: React.FC<LoginControllerProps> = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const closeLogin = useCallback(() => {
    setShowLogin(false);
  }, []);

  const closeRegister = useCallback(() => {
    setShowRegister(false);
  }, []);
  const openLogin = useCallback(() => {
    setShowLogin(true);
  }, []);

  const openRegister = useCallback(() => {
    setShowRegister(true);
  }, []);

  let middle = <div />;

  if (!showLogin && !showRegister) {
    middle = (
      <WelcomeCard
        openActionLogin={openLogin}
        openActionRegister={openRegister}
      />
    );
  }

  if (showLogin) {
    middle = <LoginCard closeAction={closeLogin} />;
  }

  if (showRegister) {
    middle = <RegisterCard closeAction={closeRegister} />;
  }

  return <MiddleLoginPanel>{middle}</MiddleLoginPanel>;
};

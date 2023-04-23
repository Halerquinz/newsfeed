import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { PageComponent } from "../../types/PageComponent";
import { useTokenStore } from "../auth/useTokenStore";
import { DefaultLoginLayout } from "../layouts/DefaultLoginLayout";
import { LoginController } from "../login/LoginController";
import { AuthContext } from "../auth/AuthProvider";
import { HeaderController } from "../display/HeaderController";

interface LoginPageProps {}

export const LoginPage: PageComponent<LoginPageProps> = ({}) => {
  const { push } = useRouter();
  const hasToken = useTokenStore((state) => !!state.token);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    if (hasToken) {
      push("/dash");
    } else {
      setTokenChecked(true);
    }
  }, [hasToken]);

  if (!tokenChecked) return null;

  return (
    <>
      <HeaderController title="Login" />
      <DefaultLoginLayout>{<LoginController />}</DefaultLoginLayout>
    </>
  );
};

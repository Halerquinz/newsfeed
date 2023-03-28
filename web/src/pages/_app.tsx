import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { isServer } from "../lib/tests/isServer";

export default function App({ Component, pageProps }: AppProps) {
  if (isServer && !Component.getInitialProps) {
    return null;
  }
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { isServer } from "../lib/tests/isServer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/tests/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  // if (isServer && !Component.getInitialProps) {
  //   return null;
  // }
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { isServer } from "../lib/tests/isServer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/tests/queryClient";
import { PageComponent } from "../types/PageComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

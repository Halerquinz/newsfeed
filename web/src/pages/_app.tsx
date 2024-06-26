import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { isServer } from "../lib/tests/isServer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/tests/queryClient";
import { PageComponent } from "../types/PageComponent";
import { ChatContextProvider } from "../modules/chat/ChatProvider";
import { WebSocketProvider } from "../modules/chat/WebSocketProvider";

export default function App({ Component, pageProps }: AppProps) {
  // if (isServer && !Component.getInitialProps) {
  //   return null;
  // }

  return (
    <AuthProvider>
      <WebSocketProvider>
        <ChatContextProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ChatContextProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
}

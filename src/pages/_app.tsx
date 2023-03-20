import Layout from "@/components/Layout";
import NextNprogress from "nextjs-progressbar";
import { CurrentUserProvider } from "@/lib/hooks/useCurrentUser";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <CurrentUserProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <NextNprogress
          color="#0097b2"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
          showOnShallow={true}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CurrentUserProvider>
    </ThemeProvider>
  );
}

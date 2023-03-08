import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

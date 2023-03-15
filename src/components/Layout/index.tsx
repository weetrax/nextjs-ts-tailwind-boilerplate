import Footer from "./Footer";
import Navbar from "./Navbar";
import NextNprogress from "nextjs-progressbar";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800 text-black dark:text-white flex flex-col min-h-screen justify-between">
      <NextNprogress
        color="#6466f1"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
      <header className="flex-none">
        <Navbar />
      </header>
      <main className="flex-auto py-8">{children}</main>
      <footer className="flex-none">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

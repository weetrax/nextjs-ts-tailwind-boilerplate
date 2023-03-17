import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800 text-black dark:text-white flex flex-col min-h-screen justify-between">
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

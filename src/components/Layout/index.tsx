import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-dark-500 text-black dark:text-white flex flex-col min-h-screen justify-between">
      <header className="flex-none sticky top-0 z-10">
        <Navbar />
      </header>
      <main className="flex-auto">{children}</main>
      <footer className="flex-none">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

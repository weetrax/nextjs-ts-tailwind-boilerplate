import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800 text-black dark:text-white flex flex-col min-h-screen justify-between">
      <header className="flex-none">
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

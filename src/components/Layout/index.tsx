import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className="flex-none">
        <Navbar />
      </header>
      <main className="flex-auto">{children}</main>
      <footer className="flex-none">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;

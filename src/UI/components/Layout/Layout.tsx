import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../Footer/Footer";

const Layout: React.FC = () => {
  const location = useLocation();

  const pagesWithFooter = ["/menu-semanal", "/", "/recetas"];

  const showFooter = pagesWithFooter.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col max-w-[500px] mx-auto relative pt-16">
      <Header title="mi menú" />
      <main className="flex-1 overflow-auto px-4">
        <Outlet />
      </main>
      {showFooter && <Footer />}
      <Toaster />
    </div>
  );
};

export default Layout;

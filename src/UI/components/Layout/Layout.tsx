import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "@/components/ui/sonner";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-[500px] mx-auto relative pt-16 pb-24">
      <Header title="Mi lista" />
      <main className="flex-1 overflow-auto p-4 ">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;

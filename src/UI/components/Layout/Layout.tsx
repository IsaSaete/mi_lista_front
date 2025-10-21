import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-[500px] mx-auto relative">
      <Header title="Mi lista" />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

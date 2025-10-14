import { Outlet } from "react-router";
import "./Layout.css";
import Header from "../Header/Header";

const Layout: React.FC = () => {
  return (
    <div className="main-container">
      <Header title="Mi lista" />
      <Outlet />
    </div>
  );
};

export default Layout;

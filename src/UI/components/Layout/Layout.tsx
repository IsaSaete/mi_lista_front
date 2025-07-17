import { Outlet } from "react-router";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  );
};

export default Layout;

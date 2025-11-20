import { Link } from "react-router-dom";
import BurguerMenu from "../BurguerMenu/BurgerMenu";
import { LogOut } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 w-full max-w-[500px] mx-auto z-60 bg-primary p-4 uppercase h-16 flex items-center justify-between">
      <BurguerMenu />

      <Link
        to="/"
        aria-label="Página principal"
        className="focus:outline-none focus:ring-3 focus:ring-secondary-hover focus:rounded-xl focus:p-1"
      >
        <h1 className="text-2xl font-bold text-foreground text-center ">
          {title}
        </h1>
      </Link>
      <LogOut width={28} height={28} />
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import BurguerMenu from "../BurguerMenu/BurgerMenu";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 w-full max-w-[500px] mx-auto z-60 bg-primary p-4 uppercase h-16 flex items-center justify-between">
      <div className="flex-1 flex justify-start">
        <BurguerMenu />
      </div>
      <Link
        to="/"
        aria-label="Página principal"
        className="focus:outline-none focus:ring-3 focus:ring-secondary-hover focus:rounded-xl focus:p-1"
      >
        <h1 className="text-2xl font-bold text-foreground text-center ">
          {title}
        </h1>
      </Link>
    </header>
  );
};

export default Header;

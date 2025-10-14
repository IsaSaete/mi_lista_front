import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-primary px-10 py-5 uppercase">
      <Link to="/" aria-label="Página principal">
        <h1 className="text-2xl font-bold text-foreground text-center">
          {title}
        </h1>
      </Link>
    </header>
  );
};

export default Header;

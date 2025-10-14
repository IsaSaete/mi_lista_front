import { Link } from "react-router";
import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <Link to={"/"} aria-label="Página principal">
        <h1 className="title-header">{title}</h1>
      </Link>
    </header>
  );
};

export default Header;

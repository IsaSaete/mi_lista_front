import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-primary px-4 py-4 uppercase h-16 flex items-center justify-center">
      <Link
        to="/"
        aria-label="Página principal"
        className="focus:outline-none focus:ring-3 focus:ring-secondary-hover p-1"
      >
        <h1 className="text-2xl font-bold text-foreground text-center ">
          {title}
        </h1>
      </Link>
    </header>
  );
};

export default Header;

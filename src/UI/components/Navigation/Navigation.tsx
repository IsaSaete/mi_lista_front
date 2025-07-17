import { NavLink } from "react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <NavLink to="/menu-semanal" className="navigation__link">
        <img
          src="/menu.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
        Menú semanal
      </NavLink>
      <NavLink to="/lista-compra" className="navigation__link">
        <img
          src="/carrito.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
        Mi cesta
      </NavLink>
      <NavLink to="/recetas" className="navigation__link">
        <img
          src="/recetario.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
        Recetas
      </NavLink>
    </nav>
  );
};

export default Navigation;

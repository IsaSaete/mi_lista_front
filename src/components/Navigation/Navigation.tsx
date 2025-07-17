import { NavLink } from "react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <NavLink to="/menu-semanal" className="navigation__link">
        Menú semanal
        <img
          src="/menu.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
      </NavLink>
      <NavLink to="/lista-compra" className="navigation__link">
        Lista de la compra
        <img
          src="/carrito.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
      </NavLink>
      <NavLink to="/recetas" className="navigation__link">
        Recetas
        <img
          src="/recetario.svg"
          alt=""
          aria-hidden="true"
          className="navigation__image"
          width={40}
          height={40}
        />
      </NavLink>
    </nav>
  );
};

export default Navigation;

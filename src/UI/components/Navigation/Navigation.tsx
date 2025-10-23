import type React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <NavLink
        to="/menu-semanal"
        className="max-w-[320px] w-full bg-secondary p-4 text-inherit rounded-[10px] text-[1.8rem] font-medium uppercase 
          flex items-center justify-between gap-5 text-left transition-transform duration-300 ease-in-out 
          shadow-md hover:bg-primary-hover  hover:scale-105 focus:outline-none focus:ring-3 focus:ring-secondary-hover"
      >
        <span className="text-2xl font-semibold text-foreground">
          MENÚ SEMANAL
        </span>
        <img src="/menu.svg" alt="" aria-hidden="true" width={40} height={40} />
      </NavLink>
      <NavLink
        to="/lista-compra"
        className="max-w-[320px] w-full bg-secondary p-4 text-inherit rounded-[10px] text-[1.8rem] font-medium uppercase 
          flex items-center justify-between gap-5 text-left transition-transform duration-300 ease-in-out 
          shadow-md hover:bg-primary-hover  hover:scale-105 focus:outline-none focus:ring-3 focus:ring-secondary-hover"
      >
        <span className="text-2xl font-semibold text-foreground">MI CESTA</span>
        <img
          src="/carrito.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
        />
      </NavLink>
      <NavLink
        to="/recetas"
        className="max-w-[320px] w-full bg-secondary  p-4 text-inherit rounded-[10px] text-[1.8rem] font-medium uppercase 
          flex items-center justify-between gap-5 text-left transition-transform duration-300 ease-in-out 
          shadow-md hover:bg-primary-hover hover:scale-105 focus:outline-none focus:ring-3 focus:ring-secondary-hover"
      >
        <span className="text-2xl font-semibold text-foreground">RECETAS</span>
        <img
          src="/recetario.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
        />
      </NavLink>
    </nav>
  );
};

export default Navigation;

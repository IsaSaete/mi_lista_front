import type React from "react";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  isMobile: boolean;
  onNavigate?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile, onNavigate }) => {
  const baseClasses = `bg-secondary p-4 text-inherit rounded-[10px] font-medium uppercase flex items-center justify-between
  transition-all duration-300 ease-in-out shadow-md hover:bg-primary-hover hover:scale-105
  focus:outline-none focus:ring-3 focus:ring-secondary-hover`;
  const mobileClasses = "max-w-[280px] w-full text-[1.4rem] gap-3";
  const desktopClasses = "max-w-[320px] w-full text-[1.8rem] gap-5";
  const mobileText = "text-xl font-semibold";
  const desktopText = "text-2xl font-semibold";
  const mobileIconSize = 32;
  const desktopIconSize = 40;

  const handleClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  return (
    <nav className="flex flex-col items-center justify-center gap-4 w-full h-full ">
      <NavLink
        to="/menu-semanal"
        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        onClick={handleClick}
      >
        <span className={isMobile ? mobileText : desktopText}>
          MENÚ SEMANAL
        </span>
        <img
          src="/menu.svg"
          alt=""
          aria-hidden="true"
          width={isMobile ? mobileIconSize : desktopIconSize}
          height={isMobile ? mobileIconSize : desktopIconSize}
        />
      </NavLink>
      <NavLink
        to="/lista-compra"
        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        onClick={handleClick}
      >
        <span className={isMobile ? mobileText : desktopText}>MI CESTA</span>
        <img
          src="/carrito.svg"
          alt=""
          aria-hidden="true"
          width={isMobile ? mobileIconSize : desktopIconSize}
          height={isMobile ? mobileIconSize : desktopIconSize}
        />
      </NavLink>
      <NavLink
        to="/recetas"
        className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        onClick={handleClick}
      >
        <span className={isMobile ? mobileText : desktopText}>RECETAS</span>
        <img
          src="/recetario.svg"
          alt=""
          aria-hidden="true"
          width={isMobile ? mobileIconSize : desktopIconSize}
          height={isMobile ? mobileIconSize : desktopIconSize}
        />
      </NavLink>
    </nav>
  );
};

export default Navigation;

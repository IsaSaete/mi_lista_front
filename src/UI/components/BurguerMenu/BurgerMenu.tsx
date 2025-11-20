import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

const BurguerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((previousState) => !previousState);
  };

  const closeBurgerMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        aria-label="Abrir menú"
        onClick={handleOpen}
        className="focus:outline-none focus:ring-3 focus:ring-secondary-hover"
      >
        <Menu width={28} height={28} className="scale-125" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-16 max-w-[500px] mx-auto ">
          <button
            className="absolute inset-0 bg-black/70 w-full max-w-[500px] mx-auto"
            onClick={closeBurgerMenu}
          />
          <div className="absolute left-0 top-0 h-full w-[75%] max-w-[400px] min-w-[300px] bg-background shadow-lg">
            <button
              onClick={closeBurgerMenu}
              className="absolute top-4 right-4 text-secondary-hover font-extrabold p-2 text-3xl z-10 hover:text-primary transition-colors"
              aria-label="Cerrar menú"
            >
              X
            </button>
            <div className="p-6 h-full flex items-center justify-center">
              <Navigation isMobile={true} onNavigate={closeBurgerMenu} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BurguerMenu;

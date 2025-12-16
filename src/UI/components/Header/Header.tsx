import { Link } from "react-router-dom";
import BurguerMenu from "../BurguerMenu/BurgerMenu";
import { LogOut } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../Modal/LogoutModal/LogoutModal";
import useAuth from "@/auth/hook/useAuth";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const { userInfo, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();

    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full max-w-[500px] mx-auto z-60 bg-primary p-4  h-16 flex items-center justify-between">
        <BurguerMenu />

        <Link
          to="/"
          aria-label="Página principal"
          className="focus:outline-none focus:ring-2 focus:ring-secondary-hover focus:rounded-lg focus:p-1"
        >
          <h1 className="text-2xl font-bold text-foreground text-center uppercase">
            {title}
          </h1>
        </Link>
        <button
          onClick={openModal}
          aria-label="Cerrar sesión"
          className="focus:outline-none focus:ring-2 focus:ring-secondary-hover focus:rounded-lg "
        >
          <LogOut
            width={28}
            height={28}
            aria-hidden="true"
            className="scale-125"
          />
        </button>
        <LogoutModal
          isOpen={showModal}
          onClose={closeModal}
          title={`Cerrar sesión ${userInfo?.name || ""}`}
          message="¿Estás seguro que quieres cerrar la sesión?"
          onConfirm={handleLogout}
        />
      </header>
    </>
  );
};

export default Header;

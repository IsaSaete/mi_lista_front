import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center p-3 uppercase">
        Página no encontrada
      </h2>
      <p className="text-xl text-center font-semibold ">
        Parece que la receta se perdió en la cocina 🍳
      </p>
      <div className="flex justify-center mt-7">
        <Link
          className="
      bg-[var(--card-color)] 
      rounded-full
      px-6 py-2
      text-lg font-medium
      flex items-center gap-4
      shadow-md
      transition-transform duration-300 ease-in-out
      hover:scale-105
    "
          to={"/"}
        >
          <img
            className="rotate-20"
            src="/flecha.svg"
            alt=""
            aria-hidden="true"
            height={40}
            width={40}
          />
          Volver
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

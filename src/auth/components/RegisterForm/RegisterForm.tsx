import { LockKeyhole, Mail, UserRound } from "lucide-react";

interface RegisterFormProps {
  onTabChange: (tab: "login" | "register") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onTabChange }) => {
  return (
    <form className="mt-10 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="username"
            className="flex gap-2 items-center font-semibold text-2xl"
          >
            <UserRound />
            Nombre
          </label>
          <input
            id="username"
            type="text"
            className="border-2 border-secondary-hover rounded-2xl text-foreground py-2 px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="email"
            className="flex gap-2 items-center font-semibold text-2xl"
          >
            <Mail />
            Email
          </label>
          <input
            id="email"
            type="text"
            className="border-2 border-secondary-hover rounded-2xl text-foreground py-2 px-4 font-semibold"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="password"
            className="flex gap-2 items-center font-semibold text-2xl"
          >
            <LockKeyhole />
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="border-2 border-secondary-hover rounded-2xl text-foreground py-2 px-4 font-semibold"
          />
        </div>
        <div className="text-center">
          <button className="border-2 bg-secondary-hover text-background rounded-3xl text-xl font-semibold p-2 w-full">
            Regístrate
          </button>
          <p className="text- text-foreground">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => onTabChange("login")} //
              className="text-secondary-hover hover:underline font-semibold"
            >
              Inicia sesión.
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;

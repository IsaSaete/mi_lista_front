import { LockKeyhole, Mail } from "lucide-react";

interface LoginFormProps {
  onTabChange: (tab: "login" | "register") => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onTabChange }) => {
  return (
    <form className="mt-10 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-1 ">
          <label
            htmlFor="email"
            className="flex gap-3 items-center font-semibold text-2xl"
          >
            <Mail />
            Email
          </label>
          <input
            required
            id="email"
            type="text"
            className="border-2 border-secondary-hover rounded-2xl text-foreground py-2 px-4 font-semibold"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 ">
          <label
            htmlFor="password"
            className="flex gap-3 items-center font-semibold text-2xl"
          >
            <LockKeyhole />
            Contraseña
          </label>
          <input
            required
            id="password"
            type="password"
            className="border-2 border-secondary-hover rounded-2xl text-foreground py-2 px-4 font-semibold"
          />
        </div>
        <div className="text-center">
          <button className="border-2 bg-secondary-hover text-background rounded-3xl text-xl font-semibold p-2 w-full">
            Iniciar sesión
          </button>
          <p className="text- text-foreground">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => onTabChange("register")} //
              className="text-secondary-hover hover:underline font-semibold"
            >
              Regístrate.
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

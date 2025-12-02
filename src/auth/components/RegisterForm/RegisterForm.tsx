import { LockKeyhole, Mail, UserRound } from "lucide-react";

interface RegisterFormProps {
  onTabChange: (tab: "login" | "register") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onTabChange }) => {
  const classLabels = "flex gap-2 items-center font-semibold text-lg";
  const classInputs =
    "border-2 border-secondary-hover rounded-2xl text-foreground py-1 px-4 font-semibold";

  return (
    <form className="mt-8 rounded-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="username" className={classLabels}>
            <UserRound />
            Nombre
          </label>
          <input id="username" type="text" className={classInputs} />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className={classLabels}>
            <Mail />
            Email
          </label>
          <input id="email" type="text" className={classInputs} />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="password" className={classLabels}>
            <LockKeyhole />
            Contraseña
          </label>
          <input id="password" type="password" className={classInputs} />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="repeat-password" className={classLabels}>
            <LockKeyhole />
            Repetir contraseña
          </label>
          <input id="repeat-password" type="password" className={classInputs} />
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

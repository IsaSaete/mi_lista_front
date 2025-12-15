import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import useAuth from "@/auth/hook/useAuth";
import type { LoginCredentials } from "@/auth/types";
import showToast from "@/UI/toast/showToast";

interface LoginFormProps {
  onTabChange: (tab: "login" | "register") => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onTabChange }) => {
  const navigate = useNavigate();

  const userData: LoginCredentials = {
    email: "",
    password: "",
  };

  const { loginUser, isLoading } = useAuth();
  const [userLoginData, setUserLoginData] = useState(userData);
  const [showErrors, setShowErrors] = useState(false);

  const classLabels = "flex gap-2 items-center font-semibold text-lg";
  const classInputs =
    "border-2 border-secondary-hover rounded-2xl text-foreground py-1 px-4 font-semibold";

  const isValidFormatEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setUserLoginData((userLoginData) => ({
      ...userLoginData,
      [event.target.id]: newValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setShowErrors(true);

    const isValidEmail = userLoginData.email.trim() !== "";
    isValidFormatEmail(userLoginData.email);
    const isValidPassword = userLoginData.password.length >= 6;

    if (!isValidEmail || !isValidPassword) {
      return;
    }

    try {
      const userCredentials: LoginCredentials = {
        email: userLoginData.email,
        password: userLoginData.password,
      };

      await loginUser(userCredentials);

      navigate("/");
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "Credenciales inválidas"
      ) {
        showToast(
          "error",
          "Credenciales no válidas",
          "Por favor, inténtalo de nuevo",
        );
      }

      setUserLoginData(userData);
    }
  };

  return (
    <form className="mt-10 rounded-md" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-1 ">
          <label htmlFor="email" className={classLabels}>
            <Mail />
            Email
          </label>
          <input
            required
            id="email"
            type="text"
            className={classInputs}
            value={userLoginData.email}
            onChange={changeUserData}
          />
          {showErrors && !userLoginData.email.trim() && (
            <p className="text-error text-sm ml-1">El email es obligatorio</p>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1 ">
          <label htmlFor="password" className={classLabels}>
            <LockKeyhole />
            Contraseña
          </label>
          <input
            required
            id="password"
            type="password"
            className={classInputs}
            value={userLoginData.password}
            onChange={changeUserData}
          />
          {showErrors && !userLoginData.password && (
            <p className="text-error text-sm ml-1">
              La contraseña es obligatorio
            </p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="border-2 bg-secondary-hover text-background rounded-3xl text-xl font-semibold p-2 w-full"
          >
            {isLoading ? "Iniciando..." : "Iniciar sesión"}
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

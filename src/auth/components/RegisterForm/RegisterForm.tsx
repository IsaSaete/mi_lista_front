import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/auth/hook/useAuth";
import type { FormCredentials, RegisterCredentials } from "@/auth/types";
import showToast from "@/UI/toast/showToast";

interface RegisterFormProps {
  onTabChange: (tab: "login" | "register") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onTabChange }) => {
  const { registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const classLabels = "flex gap-2 items-center font-semibold text-lg";
  const classInputs =
    "border-2 border-secondary-hover rounded-2xl text-foreground py-1 px-4 font-semibold shadow-lg";

  const newUserData: FormCredentials = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [userFormData, setUserFormData] = useState(newUserData);
  const [showErrors, setShowErrors] = useState(false);

  const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setUserFormData((userData) => ({
      ...userData,
      [event.target.id]: newValue,
    }));
  };

  const isFormValid =
    userFormData.password === userFormData.repeatPassword &&
    userFormData.password.length >= 6 &&
    userFormData.name !== "" &&
    userFormData.email !== "";

  const isValidFormatEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setShowErrors(true);

    const isValidName = userFormData.name.trim() !== "";
    const isValidEmail =
      userFormData.email.trim() !== "" &&
      isValidFormatEmail(userFormData.email);
    const isValidPassword = userFormData.password.length >= 6;
    const isValidRepeatPassword =
      userFormData.password === userFormData.repeatPassword;

    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidRepeatPassword
    ) {
      return;
    }

    try {
      const userCredentials: RegisterCredentials = {
        name: userFormData.name.trim(),
        email: userFormData.email.trim(),
        password: userFormData.password,
      };

      await registerUser(userCredentials);

      showToast(
        "success",
        "Usuario registrado con éxito",
        `¡Bienvenida/o ${userFormData.name}`,
      );

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "El usuario ya existe") {
        showToast("error", "Usuario ya registrado", "Por favor, inicia sesión");

        onTabChange("login");
      } else {
        showToast("error", "Error en el registro", "Inténtalo de nuevo");
      }
      setUserFormData(newUserData);
    }
  };

  return (
    <form className="mt-8 rounded-md" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="name" className={classLabels}>
            <UserRound />
            Nombre
          </label>
          <input
            value={userFormData.name}
            onChange={changeUserData}
            id="name"
            type="text"
            className={classInputs}
            required
          />
          {showErrors && !userFormData.name.trim() && (
            <p className="text-error text-sm ml-1">El nombre es obligatorio</p>
          )}
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className={classLabels}>
            <Mail />
            Email
          </label>
          <input
            value={userFormData.email}
            onChange={changeUserData}
            id="email"
            type="email"
            className={classInputs}
            required
          />
          {showErrors && !userFormData.email.trim() && (
            <p className="text-error text-sm ml-1">El email es obligatorio</p>
          )}
          {showErrors &&
            userFormData.email.trim() &&
            !isValidFormatEmail(userFormData.email) && (
              <p className="text-error text-sm ml-1">El email no es válido</p>
            )}
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="password" className={classLabels}>
            <LockKeyhole />
            Contraseña
          </label>
          <input
            value={userFormData.password}
            onChange={changeUserData}
            id="password"
            type="password"
            className={classInputs}
            required
          />
          {showErrors && userFormData.password.length < 6 && (
            <p className="text-error text-sm ml-1">Mínimo 6 caracteres</p>
          )}
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="repeatPassword" className={classLabels}>
            <LockKeyhole />
            Repetir contraseña
          </label>
          <input
            value={userFormData.repeatPassword}
            onChange={changeUserData}
            id="repeatPassword"
            type="password"
            className={classInputs}
            required
          />
          {showErrors &&
            userFormData.password !== userFormData.repeatPassword && (
              <p className="text-error text-sm ml-1">
                Las contraseñas no coinciden
              </p>
            )}
        </div>
        <div className="text-center">
          {!isFormValid && showErrors && (
            <p className="text-error text-sm mt-2">
              Completa correctamente todos los campos
            </p>
          )}
          <button
            type="submit"
            className="border-2 bg-secondary-hover text-background rounded-3xl text-xl font-semibold p-2 w-full "
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Regístrate"}
          </button>
          <p className="text- text-foreground">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => onTabChange("login")} //
              className="text-secondary-hover hover:underline font-semibold "
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

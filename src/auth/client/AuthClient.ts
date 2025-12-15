import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";
import type { AuthClientStructure } from "./types";

class AuthClient implements AuthClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public registerUser = async (
    credentials: RegisterCredentials,
  ): Promise<AuthResponse> => {
    const response = await fetch(`${this.apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("El usuario ya existe");
      }

      throw new Error("Error al registrar usuario");
    }

    const registeredUser = (await response.json()) as AuthResponse;

    return registeredUser;
  };

  public loginUser = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciales inválidas");
      }

      throw new Error("Error al verificar usuario");
    }

    const loginUser = (await response.json()) as AuthResponse;

    return loginUser;
  };
}

export default AuthClient;

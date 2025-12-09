import type { AuthResponse, RegisterCredentials } from "../types";
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
      if (response.status === 400) {
        throw new Error("Datos inválidos");
      }
      throw new Error("Error al registrar usuario");
    }

    const registeredUser = (await response.json()) as AuthResponse;

    return registeredUser;
  };
}

export default AuthClient;

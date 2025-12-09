import type { AuthResponse, RegisterCredentials } from "../types";

export interface AuthClientStructure {
  registerUser: (credentials: RegisterCredentials) => Promise<AuthResponse>;
}

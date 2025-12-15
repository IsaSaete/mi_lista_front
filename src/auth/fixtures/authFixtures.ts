import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

export const franciscaData: RegisterCredentials = {
  name: "Francisca",
  email: "francisca@francisca.com",
  password: import.meta.env.TEST_PASSWORD,
};

export const francsicaDataUser: AuthResponse = {
  token: "mock-jwt-token-for-testing-purposes-only",
  user: {
    email: "francisca@francisca.com",
    name: "Francisca",
    id: "6930210f7d257370cedf96f3",
  },
};

export const encarnitaData: RegisterCredentials = {
  name: "Encarnita",
  email: "encarnita@encarnita",
  password: import.meta.env.TEST_PASSWORD,
};

export const franciscaLogin: LoginCredentials = {
  email: "francisca@francisca.com",
  password: import.meta.env.TEST_PASSWORD,
};

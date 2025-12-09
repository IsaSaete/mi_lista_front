import type { AuthResponse, RegisterCredentials } from "../types";

export const franciscaData: RegisterCredentials = {
  name: "Francisca",
  email: "francisca@francisca.com",
  password: "encrypted",
};

export const francsicaDataUser: AuthResponse = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTMwMjEwZjdkMjU3MzcwY2VkZjk2ZjMiLCJpYXQiOjE3NjQ3NjE4NzEsImV4cCI6MTc2NzM1Mzg3MX0.w1icp0TWGyhng25I6_M0K-Hrr5lW32baajqN_1P5QTo",
  user: {
    email: "francisca@francisca.com",
    name: "Francisca",
    id: "6930210f7d257370cedf96f3",
  },
};

export const encarnitaData: RegisterCredentials = {
  name: "Encarnita",
  email: "encarnita@encarnita",
  password: "encrypted",
};

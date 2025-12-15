import {
  franciscaLogin,
  francsicaDataUser,
} from "@/auth/fixtures/authFixtures";
import AuthClient from "../AuthClient";
import { server } from "@/setupTests";
import { http, HttpResponse } from "msw";
import type { LoginCredentials } from "@/auth/types";

describe("Given the loginUser method of AuthClient", () => {
  describe("When it's called with the credentials of the user Francisca, who is already registered in", () => {
    test("Then it should return her data", async () => {
      const userLoginData = franciscaLogin;

      const authClient = new AuthClient();

      const loginedUser = await authClient.loginUser(userLoginData);

      expect(loginedUser).toEqual(francsicaDataUser);
    });
  });

  describe("When it's called with the credentials of the user Francisca, but it's incorrect", () => {
    test("Then it should thron an error with message 'Credenciales inválidas'", async () => {
      const expectedErrorMessage = "Credenciales inválidas";
      const userLoginErrorData: LoginCredentials = {
        email: "francisca2@francisca.com",
        password: import.meta.env.TEST_PASSWORD,
      };

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/auth/login`, () => {
          return new HttpResponse(null, { status: 401 });
        }),
      );

      const authClient = new AuthClient();

      const loginedErrorUser = authClient.loginUser(userLoginErrorData);

      expect(loginedErrorUser).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe("When it's called and the server responds with an error 500", () => {
    test("Then it should throw an error with message 'Error al verificar usuario'", () => {
      const expectedErrorMessage = "Error al verificar usuario";
      const userLoginData = franciscaLogin;

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/auth/login`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const authClient = new AuthClient();

      const loginedErrorUser = authClient.loginUser(userLoginData);

      expect(loginedErrorUser).rejects.toThrow(expectedErrorMessage);
    });
  });
});

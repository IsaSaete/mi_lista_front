import { http, HttpResponse } from "msw";
import {
  encarnitaData,
  franciscaData,
  francsicaDataUser,
} from "@/auth/fixtures/authFixtures";
import AuthClient from "../AuthClient";
import { server } from "@/setupTests";

describe("Given the registerUser method of AuthClient", () => {
  describe("When it's called with the credentials of the user Francisca", () => {
    test("Then it should return the data for the user Francisca and her token", async () => {
      const newUser = franciscaData;

      const authClient = new AuthClient();

      const registeredUser = await authClient.registerUser(newUser);

      expect(registeredUser).toEqual(francsicaDataUser);
    });
  });

  describe("When it's called and the server responds with an error 409", () => {
    test("Then it should throw an error with message 'El usuario ya existe'", async () => {
      const expectedErrorMessage = "El usuario ya existe";
      const newUser = franciscaData;

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/auth/register`, () => {
          return new HttpResponse(null, { status: 409 });
        }),
      );

      const authClient = new AuthClient();

      const registeredUser = authClient.registerUser(newUser);

      expect(registeredUser).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe("When it's called and the server responds with an error 500", () => {
    test("Then it should throw an error with message 'Error al registrar usuario'", () => {
      const expectedErrorMessage = "Error al registrar usuario";
      const newUser = encarnitaData;

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/auth/register`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const authClient = new AuthClient();

      const registeredUser = authClient.registerUser(newUser);

      expect(registeredUser).rejects.toThrow(expectedErrorMessage);
    });
  });
});

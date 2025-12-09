import { http, HttpResponse } from "msw";
import { type AuthResponse } from "../types";
import { francsicaDataUser } from "../fixtures/authFixtures";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found");
}

export const authHandlers = [
  http.post(`${apiUrl}/auth/register`, () => {
    return HttpResponse.json<AuthResponse>(francsicaDataUser);
  }),
];

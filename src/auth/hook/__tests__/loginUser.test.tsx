import { act, renderHook } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { Provider } from "react-redux";
import {
  franciscaData,
  franciscaLogin,
  francsicaDataUser,
} from "@/auth/fixtures/authFixtures";
import type { AuthState } from "@/auth/slice/types";
import type { AuthResponse } from "@/auth/types";
import { server } from "@/setupTests";
import setupStore from "@/store/setupStore";
import { MemoryRouter } from "react-router";
import useAuth from "../useAuth";

describe("Given the loginUser function", () => {
  describe("When it's called with Francisca credentials", () => {
    test("Then it should login succesfully", async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      const initialState: AuthState = {
        error: null,
        isLoading: false,
        userInfo: null,
        token: null,
      };

      const store = setupStore({ auth: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      server.use(
        http.post(`${apiUrl}/auth/login`, () => {
          return HttpResponse.json<AuthResponse>(francsicaDataUser);
        }),
      );

      const { result } = renderHook(() => useAuth(), { wrapper: wrapper });

      await act(async () => {
        result.current.loginUser(franciscaLogin);
      });

      const userInfo = result.current.userInfo;
      const token = result.current.token;

      expect(userInfo).toEqual(
        expect.objectContaining({
          name: franciscaData.name,
          email: franciscaData.email,
        }),
      );

      expect(token).toBe(francsicaDataUser.token);
    });
  });
});

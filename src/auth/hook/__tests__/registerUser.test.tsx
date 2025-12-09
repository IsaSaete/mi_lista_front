import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { http, HttpResponse } from "msw";
import { act, renderHook } from "@testing-library/react";
import { franciscaData, francsicaDataUser } from "@/auth/fixtures/authFixtures";
import type { AuthState } from "@/auth/slice/types";
import setupStore from "@/store/setupStore";
import useAuth from "../useAuth";
import { server } from "@/setupTests";
import type { AuthResponse } from "@/auth/types";

describe("Given the registerUser function", () => {
  describe("When it's called with Francisca credentials and she isn't yet registered ", () => {
    test("Then it should register Francisca successfully", async () => {
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
        http.post(`${apiUrl}/auth/register`, () => {
          return HttpResponse.json<AuthResponse>(francsicaDataUser);
        }),
      );

      const { result } = renderHook(() => useAuth(), { wrapper: wrapper });

      await act(async () => {
        result.current.registerUser(franciscaData);
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

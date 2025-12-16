import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { francsicaDataUser } from "@/auth/fixtures/authFixtures";
import type { AuthState } from "@/auth/slice/types";
import setupStore from "@/store/setupStore";
import useAuth from "../useAuth";

describe("Given the logoutUser function", () => {
  describe("When it's called", () => {
    test("Then it should logout user", async () => {
      const initialState: AuthState = {
        error: null,
        isLoading: false,
        userInfo: francsicaDataUser.user,
        token: francsicaDataUser.token,
      };

      const store = setupStore({ auth: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useAuth(), { wrapper: wrapper });

      await act(async () => {
        result.current.logoutUser();
      });

      const userInfo = result.current.userInfo;
      const token = result.current.token;

      expect(userInfo).toBe(null);
      expect(token).toBe(null);
    });
  });
});

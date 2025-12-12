import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import AuthClient from "../client/AuthClient";
import type { AuthResponse, RegisterCredentials } from "../types";
import {
  registerUserCreator,
  registerUserFailureCreator,
  registerUserStartCreator,
} from "../slice/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { error, isLoading, token, userInfo } = useAppSelector(
    (state) => state.auth,
  );

  const authClient = useMemo(() => new AuthClient(), []);

  const registerUser = useCallback(
    async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      dispatch(registerUserStartCreator());

      try {
        const registeredUserData = await authClient.registerUser(credentials);

        dispatch(registerUserCreator(registeredUserData));

        localStorage.setItem("token", registeredUserData.token);
        localStorage.setItem("user", JSON.stringify(registeredUserData.user));

        return registeredUserData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error en el registro";

        dispatch(registerUserFailureCreator(errorMessage));

        throw error;
      }
    },
    [authClient, dispatch],
  );

  return { registerUser, isLoading, error, token, userInfo };
};

export default useAuth;

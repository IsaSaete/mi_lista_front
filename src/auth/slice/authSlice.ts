import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import type { AuthResponse } from "../types";

const initialState: AuthState = {
  isLoading: false,
  userInfo: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.error = null;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const {
  registerUserStart: registerUserStartCreator,
  registerUserSuccess: registerUserCreator,
  registerUserFailure: registerUserFailureCreator,
  logout: logoutCreator,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

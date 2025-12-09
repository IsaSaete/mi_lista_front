export interface AuthState {
  isLoading: boolean;
  userInfo: { id: string; email: string; name: string } | null;
  token: string | null;
  error: string | null;
}

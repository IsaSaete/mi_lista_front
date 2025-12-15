import { Navigate, Route, Routes } from "react-router-dom";
import WorkInProgressPage from "../pages/WorkInProgress/WorkInProgressPage";
import HomePage from "../menu/pages/HomePage/HomePage";
import App from "../UI/components/App/App";
import MenuPage from "../menu/weeklyMenu/pages/MenuPage/MenuPage";
import ShoppingListPage from "../menu/shoppingList/pages/ShoppingListPage/ShoppingListPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import AuthPage from "@/auth/pages/AuthPage";
import useAuth from "@/auth/hook/useAuth";

const AppRouter: React.FC = () => {
  const { token } = useAuth();
  const storedToken = localStorage.getItem("token");

  const isAuthenticated = token || storedToken;

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {isAuthenticated ? (
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="menu-semanal" element={<MenuPage />} />
          <Route path="lista-compra" element={<ShoppingListPage />} />
          <Route path="recetas" element={<WorkInProgressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/auth" replace />} />
      )}
    </Routes>
  );
};
export default AppRouter;

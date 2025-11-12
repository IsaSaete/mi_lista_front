import { Route, Routes } from "react-router-dom";
import WorkInProgressPage from "../pages/WorkInProgress/WorkInProgressPage";
import HomePage from "../menu/pages/HomePage/HomePage";
import App from "../UI/components/App/App";
import MenuPage from "../menu/weeklyMenu/pages/MenuPage/MenuPage";
import ShoppingListPage from "../menu/shoppingList/pages/ShoppingListPage/ShoppingListPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="menu-semanal" element={<MenuPage />} />
        <Route path="lista-compra" element={<ShoppingListPage />} />
        <Route path="recetas" element={<WorkInProgressPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;

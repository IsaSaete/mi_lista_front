import { Route, Routes } from "react-router";
import WorkInProgressPage from "../pages/WorkInProgress/WorkInProgressPage";
import HomePage from "../menu/pages/HomePage/HomePage";
import App from "../UI/components/App/App";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="menu-semanal" element={<WorkInProgressPage />} />
        <Route path="lista-compra" element={<WorkInProgressPage />} />
        <Route path="recetas" element={<WorkInProgressPage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;

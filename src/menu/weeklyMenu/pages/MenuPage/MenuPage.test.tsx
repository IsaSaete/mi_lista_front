import { render, screen } from "@testing-library/react";
import MenuPage from "./MenuPage";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Given the MenuPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Menu semanal' inside a heading", async () => {
      render(
        <Provider store={store}>
          <MenuPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = await screen.findByRole("heading", {
        name: /menú semanal/i,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

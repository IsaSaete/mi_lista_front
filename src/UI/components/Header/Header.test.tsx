import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Given the Header component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Mi lista' inside a heading", () => {
      const expectedTitle = /mi lista/i;

      render(
        <Provider store={store}>
          <Header title="Mi lista" />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

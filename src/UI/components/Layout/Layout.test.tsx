import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show a header with a link to the home page", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <Layout />
          </MemoryRouter>
        </Provider>,
      );

      const homeLink = screen.getByRole("link", { name: /página principal/i });
      expect(homeLink).toBeInTheDocument();
    });
  });
});

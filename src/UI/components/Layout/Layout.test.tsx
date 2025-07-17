import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppRouter from "../../../router/AppRouter";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'MENÚ SEMANAL' link", () => {
      const expectedLink = /menú semanal/i;

      render(
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>,
      );

      const menuLink = screen.getByRole("link", { name: expectedLink });

      expect(menuLink).toBeInTheDocument();
    });
  });
});

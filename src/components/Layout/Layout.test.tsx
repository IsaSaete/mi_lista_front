import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'MENÚ SEMANAL' link", () => {
      const expectedLink = /menú semanal/i;

      render(<Layout />, { wrapper: MemoryRouter });

      const menuLink = screen.getByRole("link", { name: expectedLink });

      expect(menuLink).toBeInTheDocument();
    });
  });
});

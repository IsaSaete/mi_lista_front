import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router-dom";

describe("Given the Navigation component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'MENÚ SEMANAL' link", () => {
      const expectedLink = /menú semanal/i;

      render(<Navigation isMobile={false} />, { wrapper: MemoryRouter });

      const menuLink = screen.getByRole("link", { name: expectedLink });

      expect(menuLink).toBeInTheDocument();
    });

    test("Then it should show a 'MI CESTA' link", () => {
      const expectedLink = /mi cesta/i;

      render(<Navigation isMobile={false} />, { wrapper: MemoryRouter });

      const cartLink = screen.getByRole("link", { name: expectedLink });

      expect(cartLink).toBeInTheDocument();
    });

    test("Then it should show a 'RECETAS' link", () => {
      const expectedLink = /recetas/i;

      render(<Navigation isMobile={false} />, { wrapper: MemoryRouter });

      const menuLink = screen.getByRole("link", { name: expectedLink });

      expect(menuLink).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import { MemoryRouter } from "react-router";

describe("Given the NotFoundPage component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Página no encontrada' inside a heading", () => {
      const expectedTitle = /página no encontrada/i;

      render(<NotFoundPage />, { wrapper: MemoryRouter });

      const pageTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

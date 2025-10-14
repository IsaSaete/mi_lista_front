import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";

describe("Given the Header component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Mi lista' inside a heading", () => {
      const expectedTitle = /mi lista/i;

      render(<Header title="Mi lista" />, { wrapper: MemoryRouter });

      const pageTitle = screen.getByRole("heading", { name: expectedTitle });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

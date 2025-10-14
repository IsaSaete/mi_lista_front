import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";

describe("Given the HomePage component", () => {
  describe("When it renders", () => {
    test("Then it should show a link with a label text 'Recetas'", () => {
      const expectedLabelText = /recetas/i;

      render(<HomePage />, { wrapper: MemoryRouter });

      const pageTitle = screen.getByRole("link", { name: expectedLabelText });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

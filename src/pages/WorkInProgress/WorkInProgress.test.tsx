import { render, screen } from "@testing-library/react";
import WorkInProgressPage from "./WorkInProgressPage";
import { MemoryRouter } from "react-router";

describe("Given the WorkInProgressPage component", () => {
  describe("When it renders", () => {
    test("Then it should show inside a heading level 1 'Página en construcción'", () => {
      const expectedTitle = /página en construcción/i;

      render(<WorkInProgressPage />, { wrapper: MemoryRouter });

      const pageTitle = screen.getByRole("heading", {
        name: expectedTitle,
        level: 1,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    test("Then it should show a 'Volver' link", () => {
      const expectedLink = /volver/i;

      render(<WorkInProgressPage />, { wrapper: MemoryRouter });

      const linkTitle = screen.getByRole("link", { name: expectedLink });

      expect(linkTitle).toBeInTheDocument();
    });
  });
});

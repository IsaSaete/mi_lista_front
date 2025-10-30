import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import WorkInProgressPage from "./WorkInProgressPage";

describe("Given the WorkInProgressPage component", () => {
  describe("When it renders", () => {
    test("Then it should show inside a heading level 1 'Página en construcción'", async () => {
      const expectedTitle = /página en construcción/i;

      render(<WorkInProgressPage />, { wrapper: MemoryRouter });

      const pageTitle = await screen.findByRole("heading", {
        name: expectedTitle,
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

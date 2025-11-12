import { render, screen } from "@testing-library/react";
import MenuPage from "./MenuPage";
import { MemoryRouter } from "react-router";

describe("Given the MenuPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Menu semanal' inside a heading", async () => {
      render(<MenuPage />, { wrapper: MemoryRouter });

      const pageTitle = await screen.findByRole("heading", {
        name: /menú semanal/i,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});

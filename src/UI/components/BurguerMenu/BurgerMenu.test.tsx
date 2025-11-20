import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BurguerMenu from "./BurgerMenu";

describe("Given the BurgerMenu component", () => {
  describe("When it renders", () => {
    test("Then it should show a button with label 'Abrir menú'", () => {
      const expecetedButtonLabel = /abrir menú/i;

      render(
        <MemoryRouter>
          <BurguerMenu />
        </MemoryRouter>,
      );

      const menuButton = screen.getByRole("button", {
        name: expecetedButtonLabel,
      });

      expect(menuButton).toBeInTheDocument();
    });

    describe("And the user click the menu button", () => {
      test("Then it should show  a 'MENÚ SEMANAL', 'MI CESTA','RECETAS' links", async () => {
        const expectedMenuLink = /menú semanal/i;
        const expectedListLink = /mi cesta/i;
        const expectedRecipesLink = /recetas/i;

        render(
          <MemoryRouter>
            <BurguerMenu />
          </MemoryRouter>,
        );
        const menuButton = screen.getByRole("button", { name: /abrir menú/i });

        await userEvent.click(menuButton);

        const menuLink = await screen.findByRole("link", {
          name: expectedMenuLink,
        });
        const listLink = await screen.findByRole("link", {
          name: expectedListLink,
        });
        const recipesLink = await screen.findByRole("link", {
          name: expectedRecipesLink,
        });

        expect(menuLink).toBeInTheDocument();
        expect(listLink).toBeInTheDocument();
        expect(recipesLink).toBeInTheDocument();
      });

      test("Then it should show a button with label 'Cerrar menú'", async () => {
        const expecetedButtonLabel = /cerrar menú/i;

        render(
          <MemoryRouter>
            <BurguerMenu />
          </MemoryRouter>,
        );
        const menuOpenButton = screen.getByRole("button", {
          name: /abrir menú/i,
        });

        await userEvent.click(menuOpenButton);

        const menuCloseButton = await screen.findByRole("button", {
          name: expecetedButtonLabel,
        });

        expect(menuCloseButton).toBeInTheDocument();
      });
    });
  });
});

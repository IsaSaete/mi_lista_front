import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AuthPage from "./AuthPage";
import store from "@/store/store";
import AppRouter from "@/router/AppRouter";

describe("Given the AuthPage", () => {
  describe("When it renders", () => {
    test("Then it should show 'Iniciar sesión' and 'Registrarse' tabs", () => {
      const expectedRegisterText = /registrarse/i;
      const expectedLoginText = /iniciar sesión/i;

      render(
        <Provider store={store}>
          <AuthPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const registerTab = screen.getByRole("tab", {
        name: expectedRegisterText,
      });
      const loginTab = screen.getByRole("tab", { name: expectedLoginText });

      expect(registerTab).toBeInTheDocument();
      expect(loginTab).toBeInTheDocument();
    });

    test("Then it should show the login form by default", () => {
      const expectedPasswordTextBox = /contraseña/i;
      const expectedEmailTextBox = /email/i;

      render(
        <Provider store={store}>
          <AuthPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const passwordTextBox = screen.getByLabelText(expectedPasswordTextBox);
      const emailTextBox = screen.getByLabelText(expectedEmailTextBox);

      expect(passwordTextBox).toBeInTheDocument();
      expect(emailTextBox).toBeInTheDocument();
    });

    describe("And the user clicks on the 'Registrarse' tab", () => {
      test("Then it should show the register form", async () => {
        const expectedRegisterText = /registrarse/i;
        const expectedUserNameTextBox = /nombre/i;

        render(
          <Provider store={store}>
            <AuthPage />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const registerTab = screen.getByRole("tab", {
          name: expectedRegisterText,
        });

        await userEvent.click(registerTab);

        const userNameTextBox = screen.getByLabelText(expectedUserNameTextBox);

        expect(userNameTextBox).toBeInTheDocument();
      });
    });

    describe("And the user types their correct credentials and click on 'Iniciar sesión' button", () => {
      test("Then it should show the HomePage with 3 links 'MENÚ SEMANAL', 'MI CESTA' & 'RECETAS'", async () => {
        const expectedEmailText = /email/i;
        const expectedPasswordText = /contraseña/i;
        const expectedButtonText = /iniciar sesión/i;
        const userEmail = "gamusina@gamusina.com";
        const userPassword = "import.meta.env.TEST_PASSWORD";
        const expectedMenuLink = /menú semanal/i;
        const expectedShoppingListLink = /mi cesta/i;
        const expectedRecipesLink = /recetas/i;

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/auth"]}>
              <AppRouter />
            </MemoryRouter>
          </Provider>,
        );

        const emailTextBox = screen.getByLabelText(expectedEmailText);
        const passwordTextBox = screen.getByLabelText(expectedPasswordText);

        await userEvent.type(emailTextBox, userEmail);
        await userEvent.type(passwordTextBox, userPassword);

        const buttonText = screen.getByRole("button", {
          name: expectedButtonText,
        });

        await userEvent.click(buttonText);

        await waitFor(
          () => {
            const menuLink = screen.getByRole("link", {
              name: expectedMenuLink,
            });
            const cartLink = screen.getByRole("link", {
              name: expectedShoppingListLink,
            });
            const recipesLink = screen.getByRole("link", {
              name: expectedRecipesLink,
            });

            expect(menuLink).toBeInTheDocument();
            expect(cartLink).toBeInTheDocument();
            expect(recipesLink).toBeInTheDocument();
          },
          { timeout: 3000 },
        );
      });
    });
  });
});

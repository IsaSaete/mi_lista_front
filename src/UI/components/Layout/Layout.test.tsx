import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "@/store/store";
import userEvent from "@testing-library/user-event";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it should show a header with a link to the home page", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <Layout />
          </MemoryRouter>
        </Provider>,
      );

      const homeLink = screen.getByRole("link", { name: /página principal/i });
      expect(homeLink).toBeInTheDocument();
    });

    describe("And the user clicks on 'Cerrar sesión' button", () => {
      test("Then it should show a message to confirm logout", async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
              <Layout />
            </MemoryRouter>
          </Provider>,
        );

        const logoutButton = screen.getByRole("button", {
          name: /cerrar sesión/i,
        });

        await userEvent.click(logoutButton);

        const titleModal = screen.getByRole("heading", {
          name: /cerrar sesión/i,
        });

        expect(titleModal).toBeInTheDocument();
      });

      describe("And the user clicks on 'Cancelar' button", () => {
        test("Then it shouldn't show a message to confirm logout", async () => {
          render(
            <Provider store={store}>
              <MemoryRouter initialEntries={["/"]}>
                <Layout />
              </MemoryRouter>
            </Provider>,
          );

          const logoutButton = screen.getByRole("button", {
            name: /cerrar sesión/i,
          });

          await userEvent.click(logoutButton);

          const cancellButton = screen.getByRole("button", {
            name: /cancelar/i,
          });

          await userEvent.click(cancellButton);

          const titleModal = screen.queryByRole("heading", {
            name: /cerrar sesión/i,
          });

          expect(titleModal).not.toBeInTheDocument();
        });
      });

      describe("And the user clicks on 'Confirm' button", () => {
        test("Then it should show a form to login", async () => {
          render(
            <Provider store={store}>
              <MemoryRouter initialEntries={["/"]}>
                <Layout />
              </MemoryRouter>
            </Provider>,
          );

          const logoutButton = screen.getByRole("button", {
            name: /cerrar sesión/i,
          });

          await userEvent.click(logoutButton);

          const confirmButton = screen.getByRole("button", {
            name: /confirmar/i,
          });

          await userEvent.click(confirmButton);

          const titleModal = screen.queryByRole("heading", {
            name: /cerrar sesión/i,
          });

          expect(titleModal).not.toBeInTheDocument();
        });
      });
    });
  });
});

import { render, screen } from "@testing-library/react";
import MenuPage from "./MenuPage";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "@/store/store";
import userEvent from "@testing-library/user-event";

describe("Given the MenuPage component", () => {
  describe("When it renders", () => {
    test("Then it should show 'Menu semanal' inside a heading", async () => {
      render(
        <Provider store={store}>
          <MenuPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = await screen.findByRole("heading", {
        name: /menú semanal/i,
      });

      expect(pageTitle).toBeInTheDocument();
    });

    test("Then it should show a button for each day of week", async () => {
      const expectedDaysButtons = ["L", "M", "X", "J", "V", "S", "D"];

      render(
        <Provider store={store}>
          <MenuPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      expectedDaysButtons.forEach(async (day) => {
        const dayButton = await screen.findByRole("button", { name: day });

        expect(dayButton).toBeInTheDocument();
      });
    });

    describe("And the user click on 'X'", () => {
      test("Then it should show a 'Pasta integral con salsa de tomate y albahaca' as first plate in Wednesday's lunch", async () => {
        render(
          <Provider store={store}>
            <MenuPage />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const wednesdayButton = await screen.findByRole("button", {
          name: /x/i,
        });

        expect(wednesdayButton).toBeInTheDocument();

        await userEvent.click(wednesdayButton);

        const expectedfirstPlateData =
          /pasta integral con salsa de tomate y albahaca/i;

        const firstPlate = await screen.findByText(expectedfirstPlateData);

        expect(firstPlate).toBeInTheDocument();
      });
    });
  });
});

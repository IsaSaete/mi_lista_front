import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "@/store/store";
import MenuForm from "./MenuForm";
import { weeklyMenuData } from "../../fixtures/recipes";

describe("Given the MenuForm componente", () => {
  const action = vitest.fn();

  beforeEach(() => {
    action.mockClear();
  });

  describe("When it renders with Lunch Monday", () => {
    test("Then it should show a 'Día de la semana' select and 'Lunes' value", () => {
      const expetedLabel = /día de la semana/i;
      const expectedDay = "Lunes";

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const daysOptions = screen.getByRole("combobox", { name: expetedLabel });

      expect(daysOptions).toBeInTheDocument();
      expect(daysOptions).toHaveTextContent(expectedDay);
    });

    test("Then it should show a 'Comida o cena' selected and 'Comida' value", () => {
      const expectedMeal = /comida o cena/i;
      const expectedMealValue = /comida/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const mealOptions = screen.getByRole("combobox", { name: expectedMeal });

      expect(mealOptions).toBeInTheDocument();
      expect(mealOptions).toHaveTextContent(expectedMealValue);
    });

    test("Then it should show a 'Primer plato:' text", () => {
      const expectedLabel = /primer plato:/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const firstPlateTextBox = screen.getByLabelText(expectedLabel);

      expect(firstPlateTextBox).toBeInTheDocument();
    });

    describe("And the user types 'Patatas con chorizo'", () => {
      test("Then it should show 'Patatas con chorizo' inside the first plate text box", async () => {
        const expectedLabel = /primer plato:/i;
        const typeFirstPlate = "patatas con chorizo";

        render(
          <Provider store={store}>
            <MenuForm
              onClose={action}
              selectedDay="L"
              selectedMealType="lunch"
              weeklyMenu={weeklyMenuData}
            />
          </Provider>,
        );

        const firstPlateTextBox = screen.getByLabelText(expectedLabel);

        await userEvent.clear(firstPlateTextBox);

        await userEvent.type(firstPlateTextBox, typeFirstPlate);

        expect(firstPlateTextBox).toHaveValue(typeFirstPlate);
      });
    });

    test("Then it should show a 'Segundo plato:' text", () => {
      const expectedLabel = /segundo plato:/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const secondPlateTextBox = screen.getByLabelText(expectedLabel);

      expect(secondPlateTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Postre:' text", () => {
      const expectedLabel = /postre:/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const dessertTextBox = screen.getByLabelText(expectedLabel);

      expect(dessertTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Volver' text in button", () => {
      const expectedLabel = /volver/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const buttonText = screen.getByRole("button", { name: expectedLabel });

      expect(buttonText).toBeInTheDocument();
    });

    test("Then it should show a 'Guardar' text in button", () => {
      const expectedLabel = /guardar/i;

      render(
        <Provider store={store}>
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const buttonText = screen.getByText(expectedLabel);
      const saveButton = buttonText.closest("button");

      expect(saveButton).toBeInTheDocument();
    });

    describe("And the user click on 'Guardar'", () => {
      test("Then it should call the button action", async () => {
        const expectedLabel = /segundo plato:/i;
        const expectedLabelButton = /guardar menú/i;

        render(
          <Provider store={store}>
            <MenuForm
              onClose={action}
              selectedDay="L"
              selectedMealType="lunch"
              weeklyMenu={weeklyMenuData}
            />
          </Provider>,
        );

        const secondPlateTextBox = screen.getByLabelText(expectedLabel);

        await userEvent.clear(secondPlateTextBox);
        await userEvent.type(secondPlateTextBox, "Filetes rusos");

        const saveButton = screen.getByLabelText(expectedLabelButton);

        await userEvent.click(saveButton);

        expect(action).toHaveBeenCalled();
      });
    });
  });
});

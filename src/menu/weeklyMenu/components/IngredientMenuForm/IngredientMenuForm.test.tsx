import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import store from "@/store/store";
import { weeklyMenuData } from "../../fixtures/recipes";
import IngredientMenuForm from "./IngredientMenuForm";

describe("Given the IngredientMenuForm component", () => {
  const action = vitest.fn();

  beforeEach(() => {
    action.mockClear();
  });

  describe("When it renders in Monday lunch", () => {
    test("Then it should show a 'Comida Lunes' inside a heading", () => {
      render(
        <Provider store={store}>
          <IngredientMenuForm
            addIngredient={action}
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const modalTitle = screen.getByRole("heading", { name: /comida lunes/i });

      expect(modalTitle).toBeInTheDocument();
    });

    test("Then it should show a list with the menu data", () => {
      render(
        <Provider store={store}>
          <IngredientMenuForm
            addIngredient={action}
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const menuListData = screen.getAllByRole("listitem");

      expect(menuListData[0]).toHaveTextContent(
        "Ensalada de quinoa con aguacate y tomate cherry.",
      );
    });

    test("Then it should show a 'Añadir ingrediente' text", () => {
      const expectedLabel = /añadir ingrediente:/i;

      render(
        <Provider store={store}>
          <IngredientMenuForm
            addIngredient={action}
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
            weeklyMenu={weeklyMenuData}
          />
        </Provider>,
      );

      const addIngredientTextBox = screen.getByLabelText(expectedLabel);

      expect(addIngredientTextBox).toBeInTheDocument();
    });

    describe("And the user types 'Quinoa'", () => {
      test("Then it should show 'Quinoa' inside the 'Añadir ingrediente' text box", async () => {
        const expectedLabel = /añadir ingrediente:/i;
        const ingredientToAdd = "Quinoa";

        render(
          <Provider store={store}>
            <IngredientMenuForm
              addIngredient={action}
              onClose={action}
              selectedDay="L"
              selectedMealType="lunch"
              weeklyMenu={weeklyMenuData}
            />
          </Provider>,
        );

        const addIngredientTextBox = screen.getByLabelText(expectedLabel);

        await userEvent.type(addIngredientTextBox, ingredientToAdd);

        expect(addIngredientTextBox).toHaveValue(ingredientToAdd);
      });

      describe("And the user clicks on 'Añadir' button", () => {
        test("Then it should call the action", async () => {
          const expectedLabel = /añadir ingrediente:/i;
          const ingredientToAdd = "Quinoa";
          const expectedButtonText = /añadir/i;

          render(
            <Provider store={store}>
              <IngredientMenuForm
                addIngredient={action}
                onClose={action}
                selectedDay="L"
                selectedMealType="lunch"
                weeklyMenu={weeklyMenuData}
              />
            </Provider>,
          );

          const addIngredientTextBox = screen.getByLabelText(expectedLabel);

          await userEvent.type(addIngredientTextBox, ingredientToAdd);

          const addButton = screen.getByRole("button", {
            name: expectedButtonText,
          });

          await userEvent.click(addButton);

          expect(action).toHaveBeenCalled();
        });
      });
    });
  });
});

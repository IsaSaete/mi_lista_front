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
    action.mockImplementation(async () => "added");
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
        const addIngredient = vitest.fn();
        const onClose = vitest.fn();

        beforeEach(() => {
          addIngredient.mockReset();
          onClose.mockReset();
        });

        test("Then it should call addIngredient and show confirmation message", async () => {
          const expectedLabel = /añadir ingrediente:/i;
          const ingredientToAdd = "Quinoa";
          const expectedButtonText = /añadir/i;
          const expectedConfirmationText = /ingrediente añadido a tu cesta/i;

          addIngredient.mockResolvedValue("added");

          render(
            <Provider store={store}>
              <IngredientMenuForm
                addIngredient={addIngredient}
                onClose={onClose}
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

          expect(addIngredient).toHaveBeenCalled();
          expect(
            screen.getByText(expectedConfirmationText),
          ).toBeInTheDocument();
        });

        test("Then it should show duplicate message in the same feedback area", async () => {
          const expectedLabel = /añadir ingrediente:/i;
          const ingredientToAdd = "Quinoa";
          const expectedButtonText = /añadir/i;
          const expectedDuplicateMessage =
            /este ingrediente ya está en la cesta/i;

          addIngredient.mockResolvedValue("duplicate");

          render(
            <Provider store={store}>
              <IngredientMenuForm
                addIngredient={addIngredient}
                onClose={onClose}
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

          expect(
            screen.getByText(expectedDuplicateMessage),
          ).toBeInTheDocument();
        });
      });
    });
  });
});

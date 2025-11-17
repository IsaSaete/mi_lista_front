import { render, screen } from "@testing-library/react";
import MenuForm from "./MenuForm";
import userEvent from "@testing-library/user-event";

describe("Given the MenuForm componente", () => {
  const action = vitest.fn();

  describe("When it renders with Lunch Monday", () => {
    test("Then it should show a 'Día de la semana' select and 'Lunes' value", () => {
      const expetedLabel = /día de la semana/i;
      const expectedDay = "Lunes";

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const daysOptions = screen.getByRole("combobox", { name: expetedLabel });

      expect(daysOptions).toBeInTheDocument();
      expect(daysOptions).toHaveTextContent(expectedDay);
    });

    test("Then it should show a 'Comida o cena' selected and 'Comida' value", () => {
      const expectedMeal = /comida o cena/i;
      const expectedMealValue = /comida/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const mealOptions = screen.getByRole("combobox", { name: expectedMeal });

      expect(mealOptions).toBeInTheDocument();
      expect(mealOptions).toHaveTextContent(expectedMealValue);
    });

    test("Then it should show a 'Primer plato:' text", () => {
      const expectedLabel = /primer plato:/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const firstPlateTextBox = screen.getByLabelText(expectedLabel);

      expect(firstPlateTextBox).toBeInTheDocument();
    });

    describe("And the user types 'Patatas con chorizo'", () => {
      test("Then it should show 'Patatas con chorizo' inside the first plate text box", async () => {
        const expectedLabel = /primer plato:/i;
        const typeFirstPlate = "patatas con chorizo";

        render(
          <MenuForm
            onClose={action}
            selectedDay="L"
            selectedMealType="lunch"
          />,
        );

        const firstPlateTextBox = screen.getByLabelText(expectedLabel);

        await userEvent.type(firstPlateTextBox, typeFirstPlate);

        expect(firstPlateTextBox).toHaveValue(typeFirstPlate);
      });
    });

    test("Then it should show a 'Segundo plato:' text", () => {
      const expectedLabel = /segundo plato:/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const secondPlateTextBox = screen.getByLabelText(expectedLabel);

      expect(secondPlateTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Postre:' text", () => {
      const expectedLabel = /postre:/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const dessertTextBox = screen.getByLabelText(expectedLabel);

      expect(dessertTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Volver' text in button", () => {
      const expectedLabel = /volver/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const buttonText = screen.getByRole("button", { name: expectedLabel });

      expect(buttonText).toBeInTheDocument();
    });

    test("Then it should show a 'Guardar' text in button", () => {
      const expectedLabel = /guardar/i;

      render(
        <MenuForm onClose={action} selectedDay="L" selectedMealType="lunch" />,
      );

      const buttonText = screen.getByText(expectedLabel);
      const saveButton = buttonText.closest("button");

      expect(saveButton).toBeInTheDocument();
    });
  });
});

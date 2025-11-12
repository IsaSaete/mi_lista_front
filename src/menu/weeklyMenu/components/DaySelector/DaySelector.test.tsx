import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DaySelector from "./DaySelector";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Given the DaySelector component", () => {
  describe("When it renders", () => {
    test("Then it should show a 7 buttons", () => {
      render(
        <Provider store={store}>
          <DaySelector onDaySelect={() => {}} selectedDay="L" />
        </Provider>,
        {
          wrapper: MemoryRouter,
        },
      );

      const dayButtons = screen.getAllByRole("button");

      expect(dayButtons.length).toBe(7);
    });
  });
});

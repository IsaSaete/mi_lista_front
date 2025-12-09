import "@testing-library/jest-dom/vitest";

import { setupServer } from "msw/node";
import { shoppingListHandlers } from "./menu/shoppingList/mocks/handlers";
import { weeklyMenuHandlers } from "./menu/weeklyMenu/mocks/handlers";
import { authHandlers } from "./auth/mocks/handlers";

export const server = setupServer(
  ...shoppingListHandlers,
  ...weeklyMenuHandlers,
  ...authHandlers,
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

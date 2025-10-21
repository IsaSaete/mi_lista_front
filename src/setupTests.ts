import "@testing-library/jest-dom/vitest";

import { setupServer } from "msw/node";
import { shoppingListHandlers } from "./menu/shoppingList/mocks/handlers";

export const server = setupServer(...shoppingListHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

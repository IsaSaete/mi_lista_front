# Duplicate Ingredient Prevention - Technical Documentation

## 1) Executive Summary

This change introduces an end-to-end strategy to prevent duplicate ingredients in the shopping basket.

The implementation is intentionally done in **multiple layers**:

- **Backend validation (source of truth)**: rejects duplicates with HTTP `409`.
- **Frontend client error mapping**: converts `409` into a semantic error type.
- **Frontend hook guard**: prevents unnecessary network calls when duplicate exists in local state.
- **UI feedback**: informs users clearly about success or duplication.

This layered approach gives reliability, good UX, and future maintainability.

---

## 2) Problem Before the Change

Previously:

- `POST /shopping-list` inserted ingredients using `$push` without checking duplicates.
- If the same ingredient name was submitted twice, both entries were stored.
- Frontend had no explicit duplicate flow, so duplicate actions could silently succeed.

Impact:

- Data integrity issue in shopping list.
- Confusing UX (same ingredient repeated).
- Inconsistent behavior across pages depending on what state was loaded.

---

## 3) Design Decision (Why This Architecture)

### Why backend validation is mandatory

Only backend can guarantee consistency for all clients (web tabs, mobile, API consumers).  
A frontend-only check can be bypassed or become stale.

### Why frontend pre-check is still useful

When local state already contains the ingredient, we can stop early:

- faster response,
- less server load,
- immediate user feedback.

### Why custom error type

A typed error (`DuplicateIngredientError`) allows the hook/UI to distinguish:

- business conflict (`already exists`),
- generic infrastructure error (`network/server`).

This keeps error handling explicit and scalable.

---

## 4) Backend Changes

### File

- `menu-back/src/menu/shoppingList/controller/ShoppingListController.ts`

### What changed in `addIngredient`

1. **Input normalization/validation**
   - `trim()` ingredient name.
   - reject empty names with `400` and message:
     - `"El nombre del ingrediente es obligatorio"`.

2. **Duplicate detection**
   - Reads current user list with `findOne({ userId }).lean()`.
   - Compares names using normalized values (`trim().toLowerCase()`).

3. **Conflict response**
   - If duplicate found, returns `ServerError(409, "Este ingrediente ya está en la lista")`.

4. **Safe insertion**
   - Only inserts when no duplicate.
   - Stores trimmed name (`name: trimmedName`).

### Why this is correct

- Prevents duplicates at persistence boundary.
- Handles case differences (`Tomate` vs `tomate`) and accidental spaces.
- Preserves existing flow for valid non-duplicate ingredients.

---

## 5) Frontend Changes

### 5.1 Client layer

#### Files

- `src/menu/shoppingList/client/ShoppingListClient.ts`
- `src/menu/shoppingList/client/duplicateIngredientError.ts` (new)

#### What changed

- Introduced:
  - `DuplicateIngredientError extends Error`.
- In `addIngredient(...)`:
  - If response is `409`, parse backend message and throw `DuplicateIngredientError`.
  - Keep generic error for non-OK non-409 responses.

#### Important technical note

`addIngredient` was changed from class field arrow function to a class method:

- before: `public addIngredient = async (...) => { ... }`
- after: `public async addIngredient(...) { ... }`

This enables `vi.spyOn(ShoppingListClient.prototype, "addIngredient")` in tests.

---

### 5.2 Hook layer (business rules + UX behavior)

#### File

- `src/menu/shoppingList/hooks/useShoppingList.ts`

#### What changed

1. **Local duplicate guard**
   - Normalizes incoming name and compares against `ingredients` in Redux.
   - If duplicate exists locally:
     - shows toast `"Este ingrediente ya está en la lista"`,
     - returns `false`,
     - does not call API.

2. **Typed conflict handling**
   - Catches `DuplicateIngredientError` from client and shows exact message.
   - Returns `false`.

3. **Success contract**
   - `addIngredient` now returns `Promise<boolean>`:
     - `true`: ingredient inserted.
     - `false`: not inserted (duplicate or error).

This return contract lets components decide whether to show success UI.

---

### 5.3 Weekly menu modal behavior

#### Files

- `src/menu/weeklyMenu/components/IngredientMenuForm/IngredientMenuForm.tsx`
- `src/menu/weeklyMenu/components/IngredientMenuForm/IngredientMenuForm.test.tsx`

#### What changed

- `addIngredient` prop type updated to return `Promise<boolean> | boolean`.
- On submit:
  - waits for `wasAdded`.
  - shows success confirmation only when `wasAdded === true`.
- Keeps existing confirmation style (including check icon).

Result:

- If user tries duplicate, no fake success message appears.

---

### 5.4 Shopping list input component type alignment

#### File

- `src/menu/shoppingList/components/IngredientForm/IngredientForm.tsx`

#### What changed

- `addIngredient` prop type updated to align with hook return:
  - `Promise<boolean> | boolean`.

No visual/behavioral regression in this component; it remains compatible.

---

### 5.5 Proactive data preload in weekly menu page

#### File

- `src/menu/weeklyMenu/pages/MenuPage/MenuPage.tsx`

#### What changed

- In `useEffect`, page now loads:
  - `loadWeeklyMenu()`
  - `loadIngredients()`

Why:

- ensures local duplicate guard has current shopping list data even if user enters from weekly menu directly.

---

## 6) Test Coverage Added/Updated

### Backend

- `menu-back/src/menu/shoppingList/controller/__tests__/addIngredient.test.ts`
  - adds duplicate case (case-insensitive) and verifies:
    - `next` called with `ServerError 409`,
    - no `findOneAndUpdate` execution.

- `menu-back/src/menu/shoppingList/router/__tests__/addIngredientEndpoint.test.ts`
  - performs two POST calls with same name:
    - first returns `201`,
    - second returns `409` with expected error message,
    - DB still contains only one matching ingredient.

### Frontend

- `src/menu/shoppingList/client/__tests__/addIngredient.test.ts`
  - verifies `409` maps to `DuplicateIngredientError`.
  - keeps generic error coverage for non-409 failures.

- `src/menu/shoppingList/hooks/__tests__/addIngredient.test.tsx`
  - success path returns `true` and appends ingredient.
  - local duplicate path returns `false`, shows toast, skips API call.
  - server duplicate path returns `false`, shows toast, no state update.

- `src/menu/weeklyMenu/components/IngredientMenuForm/IngredientMenuForm.test.tsx`
  - shows success message when `addIngredient` resolves `true`.
  - does **not** show success message when it resolves `false`.

---

## 7) Behavior After the Change (User-Level)

### Scenario A: New ingredient

1. User submits ingredient not in list.
2. API inserts ingredient.
3. UI updates list and may show success confirmation.

### Scenario B: Duplicate in local state

1. User submits ingredient already in loaded Redux list.
2. API call is skipped.
3. User sees duplicate warning toast.
4. No duplicate entry is created.

### Scenario C: Duplicate detected by backend

1. Local state misses duplicate (stale state or edge case).
2. API returns `409`.
3. Client throws `DuplicateIngredientError`.
4. Hook handles it, shows duplicate toast, no Redux insertion.

This gives graceful behavior even in stale-state situations.

---

## 8) Architecture Notes for Junior Developers

### Key principle: trust boundaries

- **Frontend** improves UX.
- **Backend** enforces business truth.

Never rely only on frontend checks for data integrity.

### Key principle: semantic error handling

Use specific error classes for known business cases.  
This avoids fragile logic based on generic message strings.

### Key principle: return explicit outcomes

Returning `boolean` from `addIngredient` clarifies component behavior:

- show success only when operation truly succeeded.

---

## 9) Trade-offs and Future Improvements

### Current trade-offs

- Name normalization is simple (`trim + lowercase`), which is enough for this case.
- It does not yet handle accent-insensitive matching (`Tomate` vs `tomaté`) if that becomes a requirement.

### Possible improvements

1. Move `normalizeIngredientName` to shared utility module to avoid duplication across layers.
2. Add DB-level protection (e.g., normalized field + unique index by user) for stronger guarantees at scale.
3. Add telemetry for duplicate attempts to observe UX friction and suggest autocomplete.

---

## 10) Quick Reference - Files Changed

### Backend

- `menu-back/src/menu/shoppingList/controller/ShoppingListController.ts`
- `menu-back/src/menu/shoppingList/controller/__tests__/addIngredient.test.ts`
- `menu-back/src/menu/shoppingList/router/__tests__/addIngredientEndpoint.test.ts`

### Frontend

- `src/menu/shoppingList/client/ShoppingListClient.ts`
- `src/menu/shoppingList/client/duplicateIngredientError.ts` (new)
- `src/menu/shoppingList/client/__tests__/addIngredient.test.ts`
- `src/menu/shoppingList/hooks/useShoppingList.ts`
- `src/menu/shoppingList/hooks/__tests__/addIngredient.test.tsx`
- `src/menu/shoppingList/components/IngredientForm/IngredientForm.tsx`
- `src/menu/weeklyMenu/components/IngredientMenuForm/IngredientMenuForm.tsx`
- `src/menu/weeklyMenu/components/IngredientMenuForm/IngredientMenuForm.test.tsx`
- `src/menu/weeklyMenu/pages/MenuPage/MenuPage.tsx`

---

## 11) Practical Maintenance Checklist

When touching this flow in the future, verify:

- duplicate prevention still happens in backend,
- `409` still maps to `DuplicateIngredientError`,
- hook still returns a reliable success/failure signal,
- UI success messages only appear on real success,
- tests cover local duplicate + backend duplicate + happy path.

If all five remain true, the feature stays robust.

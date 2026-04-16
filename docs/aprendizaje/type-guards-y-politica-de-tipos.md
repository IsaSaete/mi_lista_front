# Type Guards y politica de tipos (guia de aprendizaje)

## Objetivo de esta nota

Guardar una explicacion clara y reutilizable sobre:

- por que usamos un _type guard_ con nombre en vez de inline,
- como leer este patron en el codigo,
- donde definir la regla de proyecto para no usar `unknown`.

---

## Caso real aplicado

En `IngredientMenuForm` se filtran los valores del objeto `mealData` para quedarse solo con strings no vacios.

En lugar de escribir el filtro inline, se usa una funcion nombrada:

```ts
const isNonEmptyString = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim() !== "";

const mealItems = Object.values(mealData).filter(isNonEmptyString);
```

---

## Que significa `value is string`

`value is string` es un **predicado de tipo** (_type guard_):

- en runtime devuelve `true` o `false`,
- en compile-time le dice a TypeScript: "si devuelve `true`, este valor es `string`".

Resultado: `mealItems` queda tipado como `string[]`, lo que evita casts y hace el codigo mas seguro.

---

## Por que esta version es mas legible

- El nombre `isNonEmptyString` comunica intencion de negocio.
- Evita repetir logica de filtrado en varios sitios.
- Facilita reviews y onboarding de personas junior.
- Se puede testear de forma aislada si en el futuro se extrae a utilidades.

---

## Regla de equipo: no usar `unknown`

Si quieres que sea una regla estable del proyecto, hay 2 niveles recomendados:

1. **Nivel de lint (obligatorio en CI)**
   - Definirlo en `eslint.config.js` para que falle en local/CI si aparece `unknown`.
   - Ventaja: enforcement tecnico real.

2. **Nivel de normas de IA/equipo (guia de estilo)**
   - Documentarlo en reglas del proyecto (`.cursor/rules` o documento de convenciones).
   - Ventaja: coherencia en PRs y en codigo generado por IA.

Lo ideal es usar ambos: guia + enforcement.

---

## Recomendacion practica para este proyecto

1. Mantener este patron de _type guard_ con nombre para filtros de tipos.
2. Crear una regla de lint para bloquear `unknown`.
3. Migrar gradualmente los `unknown` existentes para no romper desarrollo de golpe.

---

## Checklist rapido para futuras dudas de tipado

- Quieres filtrar y que TS entienda el tipo final? Usa `value is ...`.
- Quieres legibilidad para equipo? Pon nombre al guard.
- Quieres una norma que siempre se cumpla? Definela en ESLint.

---

## `setupTests.ts` explicado para junior

### Que es `setupTests.ts`

`setupTests.ts` es el archivo que se ejecuta antes de los tests.

Sirve para preparar el entorno de pruebas una sola vez, en vez de repetir configuraciones en cada archivo de test.

En este proyecto ya se usa para:

- levantar MSW (`setupServer(...)`),
- arrancar y cerrar el mock server,
- resetear handlers entre tests.

### Que problema teniamos con `window.scrollTo`

En la aplicacion real, el navegador tiene disponible `window.scrollTo(...)`.

Pero en los tests usamos **jsdom**, que simula un navegador dentro de Node y no implementa todas las APIs del navegador real.

Por eso, cuando el componente llamaba a:

```ts
window.scrollTo({ top: 0, behavior: "smooth" });
```

los tests mostraban este ruido:

```ts
Error: Not implemented: window.scrollTo
```

El test podia seguir pasando, pero la salida quedaba sucia y confusa.

### Que hicimos

En `setupTests.ts` añadimos:

```ts
beforeAll(() => {
  Object.defineProperty(window, "scrollTo", {
    value: () => undefined,
    writable: true,
  });
});
```

### Traducido a lenguaje simple

Le estamos diciendo a `window`:

- "si alguien llama a `scrollTo`, no falles",
- "haz una funcion vacia",
- "y deja el entorno de test tranquilo".

Es decir, en tests:

- no intentamos hacer scroll real,
- pero tampoco dejamos que reviente o ensucie la consola.

### Por que esta solucion es buena

- esta en un sitio global y centralizado,
- no repetimos mocks en muchos tests,
- no acoplamos cada test a detalles del navegador,
- y el comportamiento de los tests es mas limpio y predecible.

### Regla mental util

Si una API del navegador:

- existe en el navegador real,
- pero no existe o no esta implementada en jsdom,

entonces `setupTests.ts` suele ser el sitio correcto para poner un mock o un reemplazo simple.

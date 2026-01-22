# La Lista – Frontend

Frontend de **La Lista**, una aplicación web para la planificación semanal de menús y la gestión de la lista de la compra, con datos persistentes por usuario.

La aplicación permite organizar comidas y cenas por día, gestionar ingredientes y mantener una lista de la compra con control de estados (pendiente / comprado).

🔗 Demo: https://la-lista.netlify.app

---

## Descripción

La Lista es una SPA desarrollada con React y TypeScript que consume una API REST propia.  
El frontend está diseñado con un enfoque modular y escalable, priorizando claridad arquitectónica, calidad de código, testing automatizado y accesibilidad web.

Cada usuario accede a sus propios datos mediante autenticación.

---

## Funcionalidades principales

- **Autenticación de usuarios** (registro y login).
- **Planificación semanal de menús**, con:
  - Planificación de comida y cena por día.
  - Edición de primer plato, segundo plato y postre.
  - Añadir ingredientes directamente desde el menú a la lista de la compra.
- **Lista de la compra (Mi cesta)**:
  - Ingredientes por comprar.
  - Ingredientes comprados.
  - Cambio de estado mediante interacción.
  - Eliminación definitiva.
- **Sección de recetas** (en desarrollo).
- Sección en desarrollo, pensada para futura integración con una API externa de recetas.

---

## Arquitectura y estructura del proyecto

El proyecto está organizado por **dominios funcionales**, favoreciendo la separación de responsabilidades y la escalabilidad.

- Cada sección de la aplicación cuenta con:
  - Slice de Redux Toolkit.
  - Cliente de comunicación con la API.
  - Hooks personalizados.
  - Componentes específicos.

Esta organización permite:

- Reducir acoplamiento.
- Facilitar el testing.
- Mejorar la mantenibilidad del código.

---

## Gestión de estado

- Estado global gestionado con Redux Toolkit mediante slices por dominio.
- La lógica asíncrona se gestiona fuera del store:
  - Clientes de API dedicados por feature.
  - Hooks personalizados como capa de orquestación.
- Los reducers se mantienen síncronos, simples y predecibles, facilitando el testeo y el mantenimiento.

---

## Testing

El proyecto incluye testing automatizado enfocado a los flujos críticos de la aplicación.

- **Vitest** como test runner.
- **Testing Library** para pruebas de componentes.
- **MSW (Mock Service Worker)** para interceptar peticiones HTTP y testear sin depender del backend real.

El objetivo del testing es validar comportamiento y flujos de usuario, no solo implementación.

---

## Automatización y calidad

- Ejecución automática de tests mediante **GitHub Actions**.
- Análisis estático de código y control de calidad con **SonarQube**.
- Análisis de cobertura de tests integrado en el pipeline de CI.
- Auditorías de dependencias automatizadas.

---

## Accesibilidad

Durante el desarrollo se han aplicado buenas prácticas de accesibilidad web:

- Uso de HTML semántico.
- Etiquetas y roles accesibles.
- Validaciones con **Lighthouse** y **WAVE**.

---

## Stack tecnológico

### Frontend

- React
- React Router
- TypeScript
- Redux Toolkit
- Vite

### UI y estilos

- Tailwind CSS
- Radix UI
- Lucide Icons

### Testing

- Vitest
- Testing Library
- MSW

### Calidad y tooling

- ESLint
- Prettier
- Husky
- Commitlint

### Automatización y calidad

- GitHub Actions
- SonarQube

---

## Instalación y ejecución

```bash
npm install
npm run dev
npm run test

```

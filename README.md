# ERP Angular

An Angular frontend for an ERP application. The current implementation focuses on the authentication experience and provides a foundation for future ERP modules.

## Contents

- [English](#english)
- [Español](#español)

---

## English

### Overview

The application currently includes:

- A registration flow built with Angular reactive forms.
- Client-side validation for personal information, email, phone number, password strength, password confirmation, and terms acceptance.
- Country and dialing-code selection loaded from the [CountriesNow API](https://countriesnow.space/).
- Loading, error, and password visibility states in the registration experience.
- Lazy-loaded authentication routes for login and registration.

The login screen is scaffolded, while registration submission is prepared for connection to the backend authentication service.

### Tech stack

- [Angular](https://angular.dev/) 22
- TypeScript 6
- RxJS 7
- Vitest 4
- SCSS
- npm 12

### Requirements

- Node.js compatible with the installed Angular toolchain.
- npm 12.0.1 or a compatible npm version.
- Network access during registration to load country data from CountriesNow.

### Getting started

Clone the repository, install dependencies, and start the development server:

```bash
npm install
npm start
```

Open `http://localhost:4200/` in a browser. The development server reloads automatically when source files change.

### Available routes

| Route | Description |
| --- | --- |
| `/auth/login` | Login screen scaffold |
| `/auth/register` | Registration form |

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run watch` | Build continuously using the development configuration |
| `npm test` | Run unit tests with Angular and Vitest |

### Project structure

```text
src/app/
├── core/                 # Models, services, and guards
├── features/             # Feature screens such as login and registration
├── layout/               # Application layout components
├── shared/               # Reusable components and validators
├── styles/               # Global SCSS utilities, variables, and mixins
├── app.config.ts         # Application providers and configuration
└── app.routes.ts         # Application routes
```

### Configuration

The CountriesNow endpoint is configured in `src/environments/environment.ts` through `countriesApiUrl`. Backend authentication integration and production-specific environment values should be added before deploying the application.

### Development notes

Use Angular CLI commands through the project-local installation when generating code:

```bash
npx ng generate component features/example
```

For more information, see the [Angular CLI documentation](https://angular.dev/tools/cli).

---

## Español

### Descripción

Frontend ERP desarrollado con Angular. La implementación actual está enfocada en la experiencia de autenticación y sirve como base para futuros módulos del sistema ERP.

Actualmente incluye:

- Flujo de registro construido con formularios reactivos de Angular.
- Validación en el cliente para datos personales, correo electrónico, teléfono, seguridad de contraseña, confirmación de contraseña y aceptación de términos.
- Selector de países y códigos de marcación cargado desde la [API de CountriesNow](https://countriesnow.space/).
- Estados de carga, error y visibilidad de contraseña en el registro.
- Rutas de autenticación cargadas de forma diferida para inicio de sesión y registro.

La pantalla de inicio de sesión está preparada como estructura inicial. El envío del registro está listo para conectarse con el servicio de autenticación del backend.

### Tecnologías

- [Angular](https://angular.dev/) 22
- TypeScript 6
- RxJS 7
- Vitest 4
- SCSS
- npm 12

### Requisitos

- Node.js compatible con la versión instalada de Angular.
- npm 12.0.1 o una versión compatible.
- Acceso a internet durante el registro para cargar los países desde CountriesNow.

### Instalación y ejecución

Clona el repositorio, instala las dependencias e inicia el servidor de desarrollo:

```bash
npm install
npm start
```

Abre `http://localhost:4200/` en el navegador. El servidor de desarrollo se actualiza automáticamente cuando cambian los archivos fuente.

### Rutas disponibles

| Ruta | Descripción |
| --- | --- |
| `/auth/login` | Estructura inicial de inicio de sesión |
| `/auth/register` | Formulario de registro |

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo local |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run watch` | Ejecuta builds continuos con la configuración de desarrollo |
| `npm test` | Ejecuta las pruebas unitarias con Angular y Vitest |

### Estructura del proyecto

```text
src/app/
├── core/                 # Modelos, servicios y guards
├── features/             # Pantallas como login y registro
├── layout/               # Componentes de estructura de la aplicación
├── shared/               # Componentes y validadores reutilizables
├── styles/               # Utilidades, variables y mixins SCSS globales
├── app.config.ts         # Proveedores y configuración de la aplicación
└── app.routes.ts         # Rutas de la aplicación
```

### Configuración

El endpoint de CountriesNow se configura en `src/environments/environment.ts` mediante `countriesApiUrl`. Antes de publicar la aplicación deben añadirse la integración con el backend de autenticación y los valores específicos del entorno de producción.

### Notas de desarrollo

Usa los comandos de Angular CLI mediante la instalación local del proyecto cuando generes código:

```bash
npx ng generate component features/example
```

Consulta la [documentación de Angular CLI](https://angular.dev/tools/cli) para más información.

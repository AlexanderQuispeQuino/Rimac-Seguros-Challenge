🛡️ Reto Técnico Frontend - RIMAC Seguros

Este proyecto es la solución al Reto Técnico Frontend, implementado utilizando React con Vite y Sass, priorizando la modularidad, el código limpio y el diseño responsivo.

🚀 Tecnologías Utilizadas

Librería Principal: React.js (Funcional Components y Hooks)

Gestor de Proyecto: Vite

Estilos: Sass (cumpliendo con el requisito de estilos)

Ruteo: react-router-dom (para manejar el flujo de múltiples páginas)

Metodología: BEM (Bloque-Elemento-Modificador) para nombrar clases CSS.

✨ Criterios de Evaluación y Cumplimiento

Se han implementado y priorizado los siguientes puntos requeridos en el PDF:

| Requisito del Reto             | Estado          | Detalles de Implementación                                                                                                                                              |
| :----------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desarrollar con React          | ✅ Implementado | Uso de componentes funcionales, Hooks (`useState`, `useEffect`, `useMemo`) y **TypeScript (TSX)** para tipado estricto.                                                 |
| Uso de Sass                    | ✅ Implementado | Estilos definidos con Sass y estructurados con **BEM** en archivos modulares (`.scss`).                                                                                 |
| Código Limpio y Escalable      | ✅ Implementado | Estructura modular **basada en dominio** (`services`, `routes`, `types`). Lógica de negocio encapsulada en `services`.                                                  |
| Diseño Responsive (Alto Valor) | ✅ Implementado | Uso de Media Queries (`@media`) y Flexbox/Grid para adaptar el diseño de 2 columnas (desktop) a 1 columna (mobile), incluyendo scroll horizontal en la lista de planes. |
| Consumo y Manejo de APIs       | ✅ Implementado | Consumo de `/user.json` y `/plans.json` **a través de la carpeta `services/`**, con manejo de estados de carga (`isLoading`) y error.                                   |
| Manejo de Estados              | ✅ Implementado | Uso del **React Context API** (`UserDataContext.tsx`) para el estado global y manejo de estados locales vía `useState`.                                                 |
| Validación de Formularios      | ✅ Implementado | Validación de campos DNI/Celular y aceptación de políticas en el `CotizacionForm`. **Tipos de datos definidos con TypeScript.**                                         |

⚙️ Funcionalidades de Negocio Implementadas

La lógica del flujo de cotización ha sido implementada según las indicaciones:

Cálculo de Edad: La edad del usuario se calcula dinámicamente a partir del campo birthDay de la API, usando una función de utilidad (calculateAge).

Filtrado por Edad: La lista de planes se filtra para mostrar solo aquellos donde la edad del usuario es menor o igual (<=) a la edad máxima permitida del plan (plan.age).

Lógica de Descuento (5% OFF):

Si se selecciona "Para alguien más" (OTHER), se aplica el 5% de descuento al precio final (newprice). La tarjeta muestra el precio original tachado.

Si se selecciona "Para mí" (ME), no se aplica descuento.

Flujo Completo: La aplicación gestiona la transición de la página de inicio, a la selección de planes, y finalmente a la página de resumen, transmitiendo el userData y el selectedPlan a través del router state.

📂 Estructura de Carpetas

La aplicación sigue una estructura modular para garantizar la escalabilidad:

src/
├── assets/ # -> Imágenes, Íconos y Fuentes (BRSonoma)
├── components/ # -> Componentes reutilizables e independientes
│ ├── common/ # -> Componentes de UI genéricos (Ej. Footer, Header, Stepper)
│ ├── CotizacionForm/ # -> Componente principal del formulario de cotización
│ ├── PlanCard/ # -> Tarjeta individual de plan (con lógica de precio/descuento)
│ ├── QuoteOptionCard/ # -> Tarjetas de selección "Para mí" / "Para alguien más"
│ └── Stepper/ # -> Componente del indicador de pasos
├── context/ # -> Gestión de estados globales con el Context API de React
│ └── UserDataContext.tsx # -> Contexto para datos de usuario o estado global
├── pages/ # -> Componentes enrutados (vistas principales que definen el layout)
│ ├── HomePage/
│ ├── NotFoundPage/ # -> Manejo de rutas no encontradas (404)
│ ├── PlanSelectionPage/
│ └── SummaryPage/
├── routes/ # -> Configuración centralizada de las rutas de la aplicación
│ └── AppRoutes.tsx
├── services/ # -> Lógica de negocio y llamadas a APIs (encapsulamiento de fetchers)
│ ├── plan.service.tsx # -> Funciones para consumir la API de planes
│ └── user.service.tsx # -> Funciones para consumir la API de usuario
├── styles/ # -> Estilos globales, variables de Sass y utilidades (e.g., \_fonts.scss)
├── types/ # -> Definiciones de tipos de TypeScript (interfaces, types)
│ └── app-types.tsx
└── utils/ # -> Funciones de utilidad y helpers.
└── ageUtils.tsx # -> Funciones relacionadas con el cálculo de la edad.

▶️ Instrucciones de Ejecución

Clonar el repositorio.

Instalar dependencias:

npm install

Ejecutar en modo desarrollo:

npm run dev

El proyecto se abrirá en su navegador en http://localhost:5173 (o el puerto que asigne Vite).

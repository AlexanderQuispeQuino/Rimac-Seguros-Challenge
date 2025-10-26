// import React from "react";

// import "./Stepper.scss";
// import BackButton from "../common/BackButton/BackButton";

// /**
//  * Componente que muestra el indicador de pasos de forma responsiva.
//  * Muestra el stepper completo en desktop y solo el progreso en mobile.
//  * @param {number} step - El paso actual (1 o 2).
//  * @param {boolean} isDesktop - Indica si la vista actual es de escritorio.
//  */

// // 1. Definición de la interfaz de props
// interface StepperProps {
//   isDesktop: boolean;
//   step?: number | null; // El paso actual, puede ser null o number
// }

// // 2. Declaración del componente: Usamos la sintaxis de TypeScript
// const Stepper: React.FC<StepperProps> = ({ step, isDesktop }) => {
//   // Aseguramos que step sea 1 o 2 (y que no sea null, aunque TypeScript lo previene)
//   const currentStep = step === 1 || step === 2 ? step : 1;

//   // 1. Vista de ESCRITORIO (Stepper Completo)
//   if (isDesktop) {
//     return (
//       <div className="stepper">
//         <div className="stepper__path">
//           {/* PASO 1 */}
//           <span
//             className={`stepper__item ${
//               currentStep === 1 ? "stepper__item--active" : ""
//             }`}
//           >
//             1
//           </span>
//           <span
//             className={`stepper__label ${
//               currentStep === 1 ? "stepper__label--active" : ""
//             }`}
//           >
//             Planes y coberturas
//           </span>

//           {/* Línea divisora */}
//           <span
//             className={`stepper__line ${
//               currentStep === 2 ? "stepper__line--active" : ""
//             }`}
//           ></span>

//           {/* PASO 2 */}
//           <span
//             className={`stepper__item ${
//               currentStep === 2 ? "stepper__item--active" : ""
//             }`}
//           >
//             2
//           </span>
//           <span
//             className={`stepper__label ${
//               currentStep === 1
//                 ? "stepper__label--inactive"
//                 : "stepper__label--active"
//             }`}
//           >
//             Resumen
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // 2. Vista de MOBILE (Indicador de Progreso con Barra)
//   // El 'currentStep !== null' es redundante aquí gracias al chequeo inicial,
//   // pero mantenemos la lógica de renderizado mobile.

//   // Calculamos el porcentaje de progreso para la barra
//   const progressPercentage = (currentStep / 2) * 100; // Si es 1, 50%; si es 2, 100%

//   return (
//     <div className="header__step-indicator">
//       <BackButton />
//       <p className="header__step-text">Paso {currentStep} de 2</p>
//       <div className="header__progress-bar-container">
//         <div
//           className="header__progress-bar-fill"
//           style={{ width: `${progressPercentage}%` }} // Controla el relleno
//         ></div>
//         {/* El círculo que se mueve con el progreso */}
//         <span
//           className="header__progress-dot"
//           style={{
//             left: `${progressPercentage - 2}%`,
//           }} /* Ajusta el % para centrar el dot */
//         ></span>
//       </div>
//     </div>
//   );
// };

// export default Stepper;

// En Stepper.tsx
import React from "react";
// Opcional: Si necesitas el hook para el BackButton
// import { useNavigate } from "react-router-dom";

import "./Stepper.scss";
import BackButton from "../common/BackButton/BackButton";

/**
 * Componente que muestra el indicador de pasos de forma responsiva.
 * Muestra el stepper completo en desktop y solo el progreso en mobile,
 * usando Media Queries CSS para la transición.
 * @param {number} step - El paso actual (1 o 2).
 */

interface StepperProps {
  step?: number | null;
}

const Stepper: React.FC<StepperProps> = ({ step }) => {
  // Aseguramos que step sea 1 o 2. Ya no dependemos de 'isDesktop'.
  const currentStep = step === 1 || step === 2 ? step : 1;

  // Lógica de Mobile (Progreso)
  const progressPercentage = (currentStep / 2) * 100;

  // Renderizamos AMBAS vistas y usamos CSS para el responsive
  return (
    <div className="stepper-container">
      {/* 1. VISTA DE ESCRITORIO (Se oculta en mobile mediante CSS) */}
      <div className="stepper stepper--desktop">
        <div className="stepper__path">
          {/* PASO 1 */}
          <span
            className={`stepper__item ${
              currentStep === 1 ? "stepper__item--active" : ""
            }`}
          >
            1
          </span>
          <span
            className={`stepper__label ${
              currentStep === 1 ? "stepper__label--active" : ""
            }`}
          >
            Planes y coberturas
          </span>

          {/* Línea divisora */}
          <span
            className={`stepper__line ${
              currentStep === 2 ? "stepper__line--active" : ""
            }`}
          ></span>

          {/* PASO 2 */}
          <span
            className={`stepper__item ${
              currentStep === 2 ? "stepper__item--active" : ""
            }`}
          >
            2
          </span>
          <span
            className={`stepper__label ${
              currentStep === 1
                ? "stepper__label--inactive"
                : "stepper__label--active"
            }`}
          >
            Resumen
          </span>
        </div>
      </div>

      {/* 2. VISTA DE MOBILE (Se oculta en desktop mediante CSS) */}
      <div className="stepper--mobile header__step-indicator">
        {/* Usamos el BackButton con la clase para que solo oculte el texto "Volver" */}
        <BackButton />
        <p className="header__step-text">Paso {currentStep} de 2</p>
        <div className="header__progress-bar-container">
          <div
            className="header__progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <span
            className="header__progress-dot"
            style={{ left: `${progressPercentage - 2}%` }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Stepper;

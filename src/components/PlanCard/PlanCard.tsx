import React from "react";
import "./PlanCard.scss";

// NOTA: Estas interfaces deben estar disponibles globalmente, por ejemplo, en src/types/app-types.ts
// Usamos "any" aquí como fallback temporal para React, pero es mejor usar tipos definidos.
interface IPlan {
  name: string;
  price: number;
  description: string[] | string;
  age: number;
}
interface IPlanWithPrice extends IPlan {
  newprice: number;
  hasDiscount: boolean;
}
type onSelectPlanType = (plan: IPlanWithPrice) => void;
interface IPlanCardProps {
  plan: IPlanWithPrice;
  onSelect: onSelectPlanType;
  isSelected: boolean;
}

// IMPORTACIONES DE ASSETS (Asegúrate de que estas rutas sean correctas)
import IconCasa from "../../assets/icons/HomeLight.svg";
import IconCasaClinica from "../../assets/icons/HospitalLight.svg";

// =================================================================
// 1. DEFINICIÓN DE COMPONENTES DE ÍCONOS (Tipado con React.FC)
// =================================================================

// Define un tipo de props simple para los íconos
type IconProps = React.SVGProps<SVGSVGElement> | any;

// Componente IconA: (Plan en Casa)
const IconA: React.FC<IconProps> = (props) => (
  <img src={IconCasa} alt="Icono de casa" {...props} />
);

// Componente IconB: (Plan en Casa y Clínica)
const IconB: React.FC<IconProps> = (props) => (
  <img src={IconCasaClinica} alt="Icono de Hospital" {...props} />
);

// =================================================================
// 2. FUNCIÓN LÓGICA DE ÍCONOS (usa el nombre del plan)
// =================================================================
const getPlanIcon = (planName: string) => {
  if (planName && planName.includes("Plan en Casa y Clínica")) {
    return <IconB className="plan-card__svg-icon" />;
  }
  if (planName && planName.includes("Plan en Casa")) {
    return <IconA className="plan-card__svg-icon" />;
  }
  // Fallback si el nombre no coincide
  return <span className="plan-card__icon-placeholder">🛡️</span>;
};

// =================================================================
// 3. COMPONENTE PRINCIPAL PLAN CARD
// =================================================================
const PlanCard: React.FC<IPlanCardProps> = ({ plan, onSelect, isSelected }) => {
  // Desestructuración segura de las propiedades
  const { name, price, description, hasDiscount, newprice } = plan;
  const originalPrice = price;
  const finalPrice = hasDiscount ? newprice : price;

  return (
    <div
      className={`plan-card ${isSelected ? "plan-card--selected" : ""}`}
      onClick={() => onSelect(plan)}
      role="button"
      tabIndex={0} // Corregido: tabIndex debe ser de tipo number
    >
      <div className="plan-card__header">
        <div className="plan-card__info">
          <h3 className="plan-card__title">{name}</h3>
          <p className="plan-card__price">
            Costo del plan
            {hasDiscount ? (
              // 1. ESCENARIO CON DESCUENTO
              <>
                {/* Precio original tachado y con la etiqueta "antes" */}
                <span className="plan-card__price--original">
                  ${originalPrice.toFixed(2)} antes
                </span>

                {/* Precio final (con descuento) */}
                <span className="plan-card__discount-tag">
                  ${finalPrice.toFixed(2)} al mes
                </span>
              </>
            ) : (
              // 2. ESCENARIO SIN DESCUENTO
              // Muestra solo el precio original/final sin tachar ni "antes"
              <span className="plan-card__discount-tag">
                ${finalPrice.toFixed(2)} al mes
              </span>
            )}
          </p>
        </div>
        <div className="plan-card__icon">{getPlanIcon(name)}</div>
      </div>

      <ul className="plan-card__features">
        {/* Mapeo de la descripción (que es un array de strings) */}
        {Array.isArray(description) &&
          description.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <button className="plan-card__button">
        {isSelected ? "Seleccionado" : "Seleccionar Plan"}
      </button>
      {isSelected && <div className="plan-card__check-mark">✓</div>}
    </div>
  );
};

export default PlanCard;

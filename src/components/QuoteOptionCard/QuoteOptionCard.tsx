import React from "react";
import "./QuoteOptionCard.scss";

// NOTA: Esta interfaz asume que ya definiste el tipo QuoteOptionId en otro lugar (ej. "ME" | "OTHER")
interface IQuoteOptionCardProps {
  title: string;
  subtitle: string;
  icon: string; // La ruta del SVG o componente Icono
  isSelected: boolean;
  onSelect: (id: string) => void; // Asumimos que la función toma el ID de la opción
}

const QuoteOptionCard: React.FC<IQuoteOptionCardProps> = ({
  title,
  subtitle,
  icon,
  isSelected,
  onSelect,
}) => {
  // La función onClick en el JSX se encarga de pasar el ID (título en este caso)
  // El componente padre (PlanSelectionPage) usará este ID para manejar el estado.

  // En PlanSelectionPage, el mapeo pasa la prop onSelect correctamente:
  // onSelect={() => handleSelectQuoteOption(option.id)}

  return (
    <div
      className={`quote-option-card ${
        isSelected ? "quote-option-card--selected" : ""
      }`}
      // Corregido: tabIndex debe ser de tipo number
      onClick={() => onSelect(title)}
      role="radio" // Usamos role="radio" ya que solo se puede seleccionar uno
      aria-checked={isSelected}
      tabIndex={0}
    >
      <div className="quote-option-card__header">
        {/* Aquí va el SVG o el icono importado */}
        <span className="quote-option-card__icon">
          <img src={icon} alt={title} />
        </span>
        <h3 className="quote-option-card__title">{title}</h3>
      </div>
      {/* <div className="quote-option-card__selection-indicator"> */}
      {/* Checkmark de selección (círculo pequeño) */}
      <span className="quote-option-card__checkmark"></span>
      {/* </div> */}

      <p className="quote-option-card__subtitle">{subtitle}</p>
    </div>
  );
};

export default QuoteOptionCard;

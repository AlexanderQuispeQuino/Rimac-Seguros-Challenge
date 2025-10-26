import { useNavigate } from "react-router-dom";
import IconButtom from "../../../assets/icons/Icon-button.svg";
import "./BackButton.scss";

/**
 * Componente de botón de navegación hacia atrás.
 * Regresa a la página anterior en el historial del navegador.
 */

// En BackButton.tsx (usando prop 'to')
const BackButton = ({ to = null, className = "" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (to) {
      navigate(to); // Navega a una ruta específica
    } else {
      navigate(-1); // Comportamiento por defecto (atrás)
    }
  };

  return (
    <button onClick={handleGoBack} className={`back-button ${className}`}>
      <img src={IconButtom} alt="regresar" />
      <span className="back-button__text">Volver</span>
    </button>
  );
};

export default BackButton;

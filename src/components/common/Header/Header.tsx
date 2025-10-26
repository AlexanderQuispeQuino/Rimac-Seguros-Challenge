import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

import RimacLogo from "../../../assets/logos/rimac-logo.svg";
import IconPhone from "../../../assets/icons/phone.svg";

// 1. Definición de la interfaz de props
interface IHeaderProps {
  showContact?: boolean;
  showBackButton?: boolean;
}

// 2. Componente principal con tipado
const Header: React.FC<IHeaderProps> = ({
  showContact = true,
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Función para volver a la página anterior
    navigate(-1);
  };

  // Contenido del logo
  const logoContent = (
    <Link to="/" className="header__logo-link">
      <div className="header__logo">
        <img src={RimacLogo} alt="Logo de RIMAC" />
      </div>
    </Link>
  );

  return (
    <header className="header">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECCIÓN IZQUIERDA (Logo y Botón de Regreso) */}
      {/* ------------------------------------------------------------- */}
      <div className="header__left">
        {showBackButton && (
          <button onClick={handleBack} className="header__back-button">
            {/* Usamos el carácter de flecha para simplificar */}
            &larr;
          </button>
        )}
        {logoContent}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECCIÓN DERECHA (Contacto, solo si showContact es true) */}
      {/* ------------------------------------------------------------- */}
      {showContact && (
        <div className="header__right">
          <div className="header__contact-info">
            <p className="header__contact-text">¡Compra por este medio!</p>
            <p className="header__contact-phone">
              <img src={IconPhone} alt="phone" />
              (01) 411 6001
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss"; // Para los estilos específicos

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__text">
          ¡Ups! Parece que esta página ha tomado una ruta equivocada.
        </p>
        <p className="not-found-page__subtext">
          La URL que has solicitado no existe.
        </p>
        {/* El componente Link permite la navegación interna sin recargar la página */}
        <Link to="/" className="not-found-page__home-link">
          Volver a la Página Principal
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

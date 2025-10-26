import React from "react";
import Header from "../../components/common/Header/Header.tsx";
import CotizacionForm from "../../components/CotizacionForm/CotizacionForm.tsx";
import "./Home.scss";
import FamilyImage from "../../assets/images/familia-rimac.webp";
import Footer from "../../components/common/Footer/Footer";
import type { IApiUserData, IFormData } from "../../types/app-types.tsx";

// Tipo de la función que se pasa al CotizacionForm
type OnUserFetchedType = (
  formData: IFormData,
  apiResponseData: { user: IApiUserData }
) => void;

interface IHomePageProps {
  onUserFetched: OnUserFetchedType;
}

// Componente principal de la página de inicio
const HomePage: React.FC<IHomePageProps> = ({ onUserFetched }) => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-page__main">
        {/* Sección de la Imagen (Lado Izquierdo en Desktop) */}
        <section className="home-page__image-section">
          {/* Se usa decoding="async" para mejor performance */}
          <img decoding="async" src={FamilyImage} alt="Familia feliz" />
        </section>

        {/* Sección de Contenido y Títulos */}
        <section className="home-page__content-section">
          <span className="cotizacion-form__tag">Seguro Salud Flexible</span>
          <h1 className="cotizacion-form__title">
            Creado para ti y tu familia
          </h1>
        </section>

        {/* Sección del Formulario */}
        <section className="home-page__content-section-form">
          <CotizacionForm onUserFetched={onUserFetched} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

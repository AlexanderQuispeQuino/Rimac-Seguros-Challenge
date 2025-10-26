import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header/Header";
import IconFamily from "../../assets/icons/family.svg";
import "./SummaryPage.scss";
import Stepper from "../../components/Stepper/Stepper";
import BackButton from "../../components/common/BackButton/BackButton";

// NOTA: Estas interfaces deben coincidir con las definidas en App.tsx
interface IPlanWithPrice {
  name: string;
  price: number; // Precio original (sin descuento)
  newprice: number; // Precio final (con o sin descuento)
  hasDiscount: boolean;
  // Añadir otras propiedades necesarias (ej. age, description)
}

interface IUserData {
  name: string;
  lastName: string;
  docType: string;
  docNumber: string;
  phone: string;
  birthDay: string;
  userAge: number;
  // Añadir otras propiedades necesarias
}

interface ISummaryPageState {
  userData: IUserData;
  selectedPlan: IPlanWithPrice;
  quoteOption: string;
}

const SummaryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Desestructurar location.state con tipado seguro
  const state = location.state as ISummaryPageState;
  const { userData, selectedPlan } = state || {};

  // Validar si los datos esenciales existen
  if (!selectedPlan || !userData) {
    // Si faltan datos, redirigir al inicio ("/")
    useEffect(() => {
      navigate("/"); // Redirige a la ruta raíz (el "inicio")
    }, [navigate]); // navigate es estable, pero es buena práctica listarla

    return <p>Cargando datos o sesión expirada... Redirigiendo al inicio.</p>;
  }

  // Desestructurar datos de forma segura
  const userName = userData.name || "";
  const userLastName = userData.lastName || "";
  const responsibleDocType = userData.docType || "";
  const responsibleDNI = userData.docNumber || "";
  const responsiblePhone = userData.phone || "";
  const planName = selectedPlan.name || "Que plan seleccionado";

  // El precio final es el que se calculó en el componente anterior
  const finalPrice = selectedPlan.newprice?.toFixed(2);
  const hasDiscount = selectedPlan.hasDiscount || false;

  return (
    <>
      <Header showContact={true} showBackButton={false} />

      <div className="summary-page">
        {/* Stepper (Simulamos el paso 2 activo) */}
        {/* <div className="stepper">
          <div className="stepper__path">
            <span className="stepper__item stepper__item--complete">1</span>
            <span
              className="stepper__label stepper__label--complete"
              style={{ color: "#7981B2" }}
            >
              Planes y coberturas
            </span>
            <span className="stepper__line stepper__line--complete"></span>
            <span className="stepper__item stepper__item--active">2</span>
            <span className="stepper__label">Resumen</span>
          </div>
        </div> */}
        <Stepper step={2} />
        <main className="summary-page__main-content">
          <BackButton className="back-button--hide-mobile" />
          <h1 className="summary-page__title">Resumen del seguro</h1>
          <div className="summary-card">
            <h2 className="summary-card__header">PRECIOS CALCULADOS PARA:</h2>

            {/* Sección 1: Datos del asegurado */}
            <div className="summary-card__section">
              <p className="summary-card__person-name">
                <span className="summary-card__icon">
                  {" "}
                  <img src={IconFamily} alt="icon familia" />
                </span>{" "}
                {userName} {userLastName}
              </p>
            </div>

            {/* Sección 2: Datos del responsable */}
            <div className="summary-card__details">
              <h3 className="summary-card__subtitle">Responsable de pago</h3>
              <p>
                {responsibleDocType}: {responsibleDNI}
              </p>
              <p>Celular: {responsiblePhone}</p>
            </div>

            {/* Sección 3: Plan Elegido */}
            <div className="summary-card__details summary-card__details--plan">
              <h3 className="summary-card__subtitle">Plan elegido</h3>
              <p>{planName}</p>

              {/* Costo del Plan (Muestra el precio final correcto) */}
              <p className="summary-card__price">
                <strong>Costo del Plan:</strong> ${finalPrice} al mes
                {hasDiscount && (
                  <span className="summary-card__discount-info">
                    {" "}
                    (Precio con 5% OFF aplicado)
                  </span>
                )}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SummaryPage;

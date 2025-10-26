import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header/Header.tsx";
import QuoteOptionCard from "../../components/QuoteOptionCard/QuoteOptionCard";
import PlanCard from "../../components/PlanCard/PlanCard";
import type {
  IApiUserData,
  IPlan,
  IPlanWithPrice,
} from "../../types/app-types.tsx";
import { fetchPlans } from "../../services/plan.service"; // 👈 USO DEL SERVICIO AISLADO
import calculateAge from "../../utils/ageUtils.js";
import IconAddUserLight from "../../assets/icons/AddUserLight.svg";
import IconProtectionLight from "../../assets/icons/ProtectionLight.svg";
import "./PlanSelectionPage.scss";
import Stepper from "../../components/Stepper/Stepper.tsx";
import BackButton from "../../components/common/BackButton/BackButton.tsx";

// Tipado para las opciones de cotización
interface IQuoteOption {
  id: "ME" | "OTHER";
  title: string;
  subtitle: string;
  icon: string;
}

const QUOTE_OPTIONS: IQuoteOption[] = [
  {
    id: "ME",
    title: "Para mí",
    subtitle: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
    icon: IconProtectionLight,
  },
  {
    id: "OTHER",
    title: "Para alguien más",
    subtitle:
      "Realiza una cotización para uno de tus familiares o cualquier persona.",
    icon: IconAddUserLight,
  },
];

const DISCOUNT_PERCENTAGE = 0.05; // 5% de descuento

// Definimos las props
interface IPlanSelectionPageProps {
  // Ahora sabemos que userData contiene IApiUserData, que tiene name y birthDay
  userData: IApiUserData | null;
}

const PlanSelectionPage = ({ userData }: IPlanSelectionPageProps) => {
  const [selectedQuoteOption, setSelectedQuoteOption] = useState<
    IQuoteOption["id"] | null
  >(null);
  const [allPlans, setAllPlans] = useState<IPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPlanWithPrice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // -----------------------------------------------------------------
  // Extraer datos y calcular la edad
  // -----------------------------------------------------------------
  const userAge: number = userData?.birthDay
    ? calculateAge(userData.birthDay)
    : 30; // 30 como fallback
  const userName: string = userData?.name || "Usuario";

  // -----------------------------------------------------------------
  // 1. CONSUMO Y FILTRADO INICIAL DE PLANES (useEffect) - Actualizado para usar servicio
  // -----------------------------------------------------------------
  useEffect(() => {
    const loadPlans = async () => {
      try {
        // LLAMADA AL SERVICIO AISLADO
        const plansList = await fetchPlans();
        setAllPlans(plansList);
      } catch (e: any) {
        console.error("Error fetching plans:", e);
        setError(e.message || "No se pudieron obtener los planes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, []); // El array de dependencia vacío indica que se ejecuta solo al montar

  // -----------------------------------------------------------------
  // 2. LÓGICA DE FILTRADO Y DESCUENTO (useMemo)
  // -----------------------------------------------------------------
  const availablePlans: IPlanWithPrice[] = useMemo(() => {
    if (!selectedQuoteOption) {
      return [];
    }

    // 1. Filtrado por Edad
    const filteredPlans: IPlan[] = allPlans.filter((plan: IPlan) => {
      return userAge <= plan.age;
    });

    // 2. Mapeo para calcular precio y descuento
    const plansWithPrice: IPlanWithPrice[] = filteredPlans.map(
      (plan: IPlan) => {
        // Descuento solo para 'OTHER'
        const applyDiscount: boolean = selectedQuoteOption === "OTHER";

        const calculatedNewPrice: number = applyDiscount
          ? plan.price * (1 - DISCOUNT_PERCENTAGE)
          : plan.price;

        return {
          ...plan,
          newprice: calculatedNewPrice,
          hasDiscount: applyDiscount,
        };
      }
    );

    return plansWithPrice;
  }, [allPlans, selectedQuoteOption, userAge]);

  // -----------------------------------------------------------------
  // 3. MANEJO DE SELECCIÓN Y REDIRECCIÓN
  // -----------------------------------------------------------------
  const handleSelectQuoteOption = (id: IQuoteOption["id"]) => {
    setSelectedQuoteOption(id);
    setSelectedPlan(null); // Reiniciar selección al cambiar de opción
  };

  const handleSelectPlan = (plan: IPlanWithPrice) => {
    setSelectedPlan(plan);
    // Navegación con estado para que SummaryPage pueda acceder a los datos
    navigate("/resumen", {
      state: {
        userData: userData,
        selectedPlan: plan,
        quoteOption: selectedQuoteOption,
      },
    });
  };

  if (isLoading) {
    return <div className="loading-state">Cargando planes...</div>;
  }
  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <>
      <Header showContact={true} showBackButton={false} />
      <Stepper step={1} />

      <div className="plan-selection-page">
        <BackButton className="back-button--hide-mobile" />
        <main className="plan-selection-page__main">
          <section className="plan-selection-page__main-content">
            <h1 className="plan-selection-page__title">
              {userName} ¿Para quién deseas cotizar?
            </h1>
            <p className="plan-selection-page__subtitle">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            {/* 1. SELECCIÓN DE OPCIÓN */}
            <section className="plan-selection-page__options-grid">
              {QUOTE_OPTIONS.map((option) => (
                <QuoteOptionCard
                  key={option.id}
                  title={option.title}
                  subtitle={option.subtitle}
                  icon={option.icon}
                  isSelected={selectedQuoteOption === option.id}
                  onSelect={() => handleSelectQuoteOption(option.id)}
                />
              ))}
            </section>
          </section>
        </main>
        {/* 2. LISTA DE PLANES */}
        {selectedQuoteOption && (
          <section className="plan-selection-page__plans-list">
            <div className="plan-selection-page__plans-grid">
              {availablePlans.length > 0 ? (
                availablePlans.map((plan: IPlanWithPrice) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    onSelect={(selectedPlanFromCard: any) =>
                      handleSelectPlan({
                        ...selectedPlanFromCard,
                        description: Array.isArray(
                          selectedPlanFromCard.description
                        )
                          ? selectedPlanFromCard.description
                          : [String(selectedPlanFromCard.description)],
                      })
                    }
                    isSelected={selectedPlan?.name === plan.name}
                  />
                ))
              ) : (
                <p>
                  No hay planes disponibles para tu edad ({userAge} años) con
                  los filtros seleccionados.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PlanSelectionPage;

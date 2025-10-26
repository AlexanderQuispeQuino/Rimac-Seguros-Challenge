import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Importamos el hook para acceder a los datos
import { useUserData } from "../context/UserDataContext";

// Importamos los componentes de página
import HomePage from "../pages/HomePage/HomePage";
import PlanSelectionPage from "../pages/PlanSelectionPage/PlanSelectionPage.tsx";
import SummaryPage from "../pages/SummaryPage/SummaryPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx"; // Componente recomendado

// El componente AppRoutes define el flujo de navegación.
const AppRoutes: React.FC = () => {
  const { userData, handleUserFetched } = useUserData();

  return (
    <Routes>
      <Route
        path="/"
        // HomePage necesita la función para guardar el estado después del fetch
        element={<HomePage onUserFetched={handleUserFetched} />}
      />

      <Route
        path="/planes"
        // Lógica de protección: Solo acceder si userData existe
        element={
          userData ? (
            // PlanSelectionPage ya no necesita recibir userData como prop,
            // puede obtenerlo directamente usando useUserData() internamente
            <PlanSelectionPage userData={userData} />
          ) : (
            <Navigate to="/" /> // Redirige si intenta acceder sin datos
          )
        }
      />

      <Route
        path="/resumen"
        element={userData ? <SummaryPage /> : <Navigate to="/" />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

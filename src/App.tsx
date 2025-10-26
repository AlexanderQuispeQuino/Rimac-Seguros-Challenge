import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { UserDataProvider } from "./context/UserDataContext"; // 👈 ¡Nuevo!
import "./styles/global.scss"; // Los estilos globales se cargan aquí

const App: React.FC = () => {
  return (
    // 1. BrowserRouter: Se encarga del enrutamiento
    <BrowserRouter>
      {/* 2. UserDataProvider: Se encarga de la lógica de estado del usuario */}
      <UserDataProvider>
        {/* 3. AppRoutes: Se encarga de renderizar las páginas (vistas) */}
        <AppRoutes />
      </UserDataProvider>
    </BrowserRouter>
  );
};

export default App;

import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { IApiUserData, IFormData } from "../types/app-types";

// 1. Definición del tipo de datos del usuario
export interface IUserData extends IFormData, IApiUserData {
  // Aquí se hereda toda la información unificada
}

// 2. Definición del Contexto (Qué se expone al resto de la app)
interface IUserDataContext {
  userData: IUserData | null;
  // Función para guardar los datos y navegar
  handleUserFetched: (
    formData: IFormData,
    apiResponseData: { user: IApiUserData }
  ) => void;
}

// Inicialización del Contexto con valores predeterminados (incluyendo la función dummy)
const UserDataContext = createContext<IUserDataContext | undefined>(undefined);

// 3. Componente Proveedor (Provider)
export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const navigate = useNavigate();

  const handleUserFetched = useCallback(
    (formData: IFormData, apiResponseData: { user: IApiUserData }) => {
      // 1. Desestructuración de la data anidada
      // const { user } = apiResponseData; // user ahora es { name, lastName, age, ... }
      // debugger;
      // 2. Unificación de datos en el nivel superior (IUserData)
      const fullUserData: IUserData = {
        ...formData, // docType, docNumber, phone...
        // Los datos de la API se extienden al mismo nivel
        ...apiResponseData, // name, lastName, age...
        ...apiResponseData.user,
      };

      setUserData(fullUserData);
      navigate("/planes");
    },
    [navigate]
  );

  return (
    <UserDataContext.Provider value={{ userData, handleUserFetched }}>
      {children}
    </UserDataContext.Provider>
  );
};

// 4. Hook personalizado para usar el contexto fácilmente
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData debe usarse dentro de un UserDataProvider");
  }
  return context;
};

// ===============================================
// TIPOS GENERALES DE LA APLICACIÓN
// ===============================================

// 1. Tipos de datos del Formulario de Cotización (CotizacionForm.tsx)
export interface IFormData {
  docType: "DNI" | "CE"; // Aseguramos que solo sean estos dos valores
  docNumber: string;
  phone: string;
  privacyAccepted: boolean;
  commsAccepted: boolean;
}

// 2. Tipos de datos del Usuario (Respuesta de la API)
export interface IApiUserData {
  name: string;
  lastName: string;
  birthDay: string;
  documentType: "DNI" | "CE";
  documentNumber: string;
  email: string;
}

// 3. Tipos de datos del Usuario UNIFICADOS (Usados en App.tsx y transferidos)
// Combina datos de API y Formulario
export interface IUserData extends IApiUserData {
  docType: string; // del formulario
  docNumber: string; // del formulario
  phone: string; // del formulario
  userAge: number; // edad calculada
}

// 4. Tipos de datos de los Planes (Respuesta de la API)
export interface IPlan {
  name: string;
  price: number; // Precio original de la API
  description: string[];
  age: number; // Edad máxima cubierta
}

// 5. Tipos de datos de los Planes con Lógica Aplicada (Usado en PlanSelectionPage.tsx)
// Contiene el precio final y la bandera de descuento
export interface IPlanWithPrice extends IPlan {
  newprice: number; // Precio final (con o sin descuento)
  hasDiscount: boolean;
}

export interface IFormErrors {
  docNumber?: string | null;
  phone?: string | null;
  privacyAccepted?: string | null;
  commsAccepted?: string | null;
  [key: string]: string | null | undefined;
}

// ===============================================
// TIPOS DE PROPS (FUNCIONES CALLBACK)
// ===============================================

// Tipo para la función que el CotizacionForm envía al App.tsx
export type OnUserFetchedType = (
  formData: IFormData,
  apiResponseData: { user: IApiUserData }
) => void;

// Tipo para la función que se usa al seleccionar un plan
export type onSelectPlanType = (plan: IPlanWithPrice) => void;

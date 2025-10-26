import type { IFormData, IApiUserData } from "../types/app-types";

const API_USER = "https://rimac-front-end-challenge.netlify.app/api/user.json";

/**
 * Función que consume el servicio /user para obtener datos personales.
 * @param formData Datos del formulario para propósitos de logging.
 * @returns Una promesa que resuelve con los datos del usuario de la API.
 */
export const fetchUserData = async (
  formData: IFormData // Se usa el docNumber, aunque la URL sea estática.
): Promise<{ user: IApiUserData }> => {
  formData;
  try {
    const response = await fetch(API_USER);

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario.");
    }

    const apiResponseData: { user: IApiUserData } = await response.json();
    return apiResponseData;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error(
      "No pudimos obtener tus datos. Revisa la conexión o el servicio."
    );
  }
};

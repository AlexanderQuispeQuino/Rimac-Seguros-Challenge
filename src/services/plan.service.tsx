import type { IPlan } from "../types/app-types";

const API_PLANS =
  "https://rimac-front-end-challenge.netlify.app/api/plans.json";

/**
 * Función que consume el servicio /plans para obtener la lista completa de planes.
 * @returns Una promesa que resuelve con el array de planes.
 */
export const fetchPlans = async (): Promise<IPlan[]> => {
  // console.log("[SERVICE] Solicitando lista de planes.");

  try {
    const response = await fetch(API_PLANS);

    if (!response.ok) {
      throw new Error("Fallo al cargar los planes.");
    }

    // Se asume que la API devuelve { list: IPlan[] }
    const data: { list: IPlan[] } = await response.json();
    return data.list || [];
  } catch (e: any) {
    console.error("Error fetching plans:", e);
    throw new Error("No se pudieron obtener los planes.");
  }
};

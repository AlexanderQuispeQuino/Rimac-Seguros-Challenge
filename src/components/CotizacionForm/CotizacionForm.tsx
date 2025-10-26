import { useState } from "react";
import type {
  IFormData,
  IApiUserData,
  IFormErrors,
  OnUserFetchedType,
} from "../../types/app-types";
import { fetchUserData } from "../../services/user.service"; // 👈 USO DEL SERVICIO AISLADO
import "./CotizacionForm.scss";

// CONSTANTES (Se mantienen para la validación local)
const DNI_LENGTH = 8;
const CE_LENGTH = 9;
const PHONE_LENGTH = 9;

interface ICotizacionFormProps {
  onUserFetched: OnUserFetchedType;
}

const CotizacionForm = ({ onUserFetched }: ICotizacionFormProps) => {
  // Inicialización de estado
  const [formData, setFormData] = useState<IFormData>({
    docType: "DNI",
    docNumber: "",
    phone: "",
    privacyAccepted: false,
    commsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState<IFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Funciones de manejo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked =
      type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

    let newValue: string | boolean | undefined;
    let isDocTypeChange = name === "docType";

    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "docNumber" || name === "phone") {
      const maxLength =
        name === "docNumber"
          ? formData.docType === "DNI"
            ? DNI_LENGTH
            : CE_LENGTH
          : PHONE_LENGTH;

      // Limitar longitud en el input y permitir solo números.
      newValue = value.slice(0, maxLength);
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      ...(isDocTypeChange && { docNumber: "" }), // Limpiar número si cambia el tipo
    }));

    // Limpiar errores
    setFormErrors((prev) => {
      const newErrors = { ...prev, [name]: null };
      if (isDocTypeChange) {
        newErrors.docNumber = null;
      }
      return newErrors;
    });
    setApiError(null);
  };

  const validateForm = (): boolean => {
    const errors: IFormErrors = {};

    // Validación de Documento
    const requiredDocLength =
      formData.docType === "DNI" ? DNI_LENGTH : CE_LENGTH;
    const docTypeName = formData.docType;

    if (
      !formData.docNumber ||
      formData.docNumber.length !== requiredDocLength
    ) {
      errors.docNumber = `Debes ingresar tu N° de documento de ${docTypeName}.`;
    }

    // Validación de Celular
    if (!formData.phone || formData.phone.length !== PHONE_LENGTH) {
      errors.phone = `Debes ingresar tu número de celular.`;
    }

    // Validación de Checkboxes
    if (!formData.privacyAccepted) {
      errors.privacyAccepted = "Debes aceptar la Política de Privacidad.";
    }

    if (!formData.commsAccepted) {
      errors.commsAccepted =
        "Debes aceptar la Política de Comunicaciones Comerciales.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ------------------------------------------------------------------
  // FUNCIÓN CENTRAL: Llama al servicio de API
  // ------------------------------------------------------------------
  const handleFetchUserData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      // Usa el servicio, que contiene la lógica del fetch a /user.json
      const apiResponseData: { user: IApiUserData } = await fetchUserData(
        formData
      );

      // Si es exitoso, pasa los datos unificados al AppFlowManager para cambiar el estado y navegar
      if (onUserFetched) {
        onUserFetched(formData, apiResponseData);
      }
    } catch (error: any) {
      console.error("API Fetch Error:", error);
      // Muestra el mensaje de error que viene del servicio o un genérico.
      setApiError(
        error.message || "No pudimos obtener tus datos. Revisa la conexión."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleFetchUserData();
    }
  };

  const currentMaxLength = formData.docType === "DNI" ? DNI_LENGTH : CE_LENGTH;
  const isDocError = !!formErrors.docNumber;

  return (
    <div className="cotizacion-form max-w-sm mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <div className="cotizacion-form__header">
        <p className="cotizacion-form__subtitle">
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
          asesoría. 100% online.
        </p>
      </div>

      <form
        className="cotizacion-form__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Campo de Documento */}
        <div
          className={`cotizacion-form__input-group cotizacion-form__input-group--doc ${
            isDocError ? "is-error" : ""
          }`}
        >
          <div
            className={`cotizacion-form__select-container ${
              isDocError ? "is-error" : ""
            }`}
          >
            <select
              name="docType"
              value={formData.docType}
              onChange={handleChange}
              className={`cotizacion-form__select ${
                isDocError ? "is-error" : ""
              }`}
            >
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
            </select>
          </div>

          <div
            className={`cotizacion-form__input-group cotizacion-form__input-group--labeled custom-input ${
              isDocError ? "is-error" : ""
            }`}
          >
            <label htmlFor="docNumber" className="cotizacion-form__label">
              Nro. de documento
            </label>
            <input
              type="number"
              id="docNumber"
              name="docNumber"
              // Actualizamos el placeholder para reflejar la longitud de DNI/CE
              placeholder={
                formData.docType === "DNI"
                  ? `${DNI_LENGTH} dígitos`
                  : `${CE_LENGTH} dígitos`
              }
              value={formData.docNumber}
              onChange={handleChange}
              className="cotizacion-form__input"
              maxLength={currentMaxLength} // Limita la entrada de caracteres
            />
          </div>
        </div>
        {formErrors.docNumber && (
          <p className="cotizacion-form__error-message">
            {formErrors.docNumber}
          </p>
        )}

        {/* Campo de Celular */}
        <div
          className={`cotizacion-form__input-group cotizacion-form__input-group--labeled ${
            formErrors.phone ? "is-error" : ""
          }`}
        >
          <label htmlFor="phone" className="cotizacion-form__label">
            Celular
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="9 dígitos"
            value={formData.phone}
            autoComplete="on"
            onChange={handleChange}
            className="cotizacion-form__input"
            maxLength={PHONE_LENGTH} // Limita la entrada de caracteres
          />
        </div>
        {formErrors.phone && (
          <p className="cotizacion-form__error-message">{formErrors.phone}</p>
        )}

        {/* Checkboxes */}
        <div className="cotizacion-form__checkbox-container">
          <label className="cotizacion-form__label-check">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
            />
            Acepto la Política de Privacidad
          </label>
          {formErrors.privacyAccepted && (
            <p className="cotizacion-form__error-message cotizacion-form__error-message--checkbox">
              {formErrors.privacyAccepted}
            </p>
          )}
          <label className="cotizacion-form__label-check">
            <input
              type="checkbox"
              name="commsAccepted"
              checked={formData.commsAccepted}
              onChange={handleChange}
            />
            Acepto la Política de Comunicaciones Comerciales
          </label>
          {formErrors.commsAccepted && (
            <p className="cotizacion-form__error-message cotizacion-form__error-message--checkbox">
              {formErrors.commsAccepted}
            </p>
          )}
          <p className="cotizacion-form__terms">
            <a href="#">Aplican Términos y Condiciones.</a>
          </p>
        </div>

        {apiError && <p className="cotizacion-form__api-error">{apiError}</p>}

        {/* Botón */}
        <button
          type="submit"
          className="cotizacion-form__button"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Cotiza aquí"}
        </button>
      </form>
    </div>
  );
};

export default CotizacionForm;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App /> {/* Renderiza el componente App */}
  </StrictMode>
);

import "./Footer.scss";
import LogoWhite from "../../../assets/logos/rimac-logo-white-desktop.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Usamos un div para el logo y nombre, siguiendo la estructura del diseño */}
        <div className="footer__logo">
          {/* Asegúrate de que este SVG/imagen esté en tu carpeta assets */}
          <img src={LogoWhite} alt="Logo de RIMAC" />
        </div>

        {/* Texto de Copyright */}
        <p className="footer__copyright">© 2025 RIMAC Seguros y Reaseguros.</p>
      </div>
    </footer>
  );
};

export default Footer;

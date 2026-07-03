import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/assets/logos/sic-jac-logo.svg" alt="SIC-JAC" />
        <p>Soluciones contables y administrativas para empresas bolivianas.</p>
      </div>
      <div>
        <h2>Explorar</h2>
        <Link to="/productos">Productos</Link>
        <Link to="/descargas">Descargas</Link>
        <Link to="/clientes">Clientes</Link>
      </div>
      <div>
        <h2>Contacto</h2>
        <span><MapPin size={17} /> La Paz, Bolivia</span>
        <span><Phone size={17} /> +591 2 2204200</span>
        <span><Mail size={17} /> consultas@sic-jac.com</span>
      </div>
    </footer>
  );
}

export default Footer;

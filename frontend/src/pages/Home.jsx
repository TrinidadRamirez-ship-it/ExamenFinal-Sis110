import { ArrowRight, BarChart3, Headphones, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { productos } from '../data/productos.js';

const features = [
  {
    icon: ShieldCheck,
    titulo: 'Informacion confiable',
    descripcion: 'Controles y reportes que mantienen los datos empresariales ordenados y disponibles.'
  },
  {
    icon: BarChart3,
    titulo: 'Decision con datos',
    descripcion: 'Indicadores claros para conocer ventas, costos, saldos, inventarios y resultados.'
  },
  {
    icon: Headphones,
    titulo: 'Soporte cercano',
    descripcion: 'Acompanamiento durante la instalacion, configuracion y uso cotidiano de cada modulo.'
  }
];

function Home() {
  return (
    <>
      <section className="home-hero">
        <img
          src="/assets/images/sic-jac-dashboard-hero.png"
          alt="Panel de gestion empresarial SIC-JAC en una oficina moderna"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Software empresarial en Bolivia</p>
          <h1>Gestion clara para empresas que quieren avanzar</h1>
          <p>
            Integra contabilidad, inventarios, planillas, facturacion y activos
            en herramientas disenadas para el trabajo diario.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/productos">
              Conocer productos
              <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" to="/contactos">Solicitar informacion</Link>
          </div>
        </div>
      </section>

      <section className="section-band intro-band">
        <div className="section-heading align-left">
          <p className="eyebrow">Soluciones modulares</p>
          <h2>Un sistema que crece con tu empresa</h2>
          <p>
            Empieza con el modulo que necesitas y suma nuevas herramientas sin
            perder orden ni continuidad en tu informacion.
          </p>
        </div>
        <div className="metric-row">
          <div><strong>6+</strong><span>modulos principales</span></div>
          <div><strong>3</strong><span>ciudades con atencion</span></div>
          <div><strong>1</strong><span>ecosistema integrado</span></div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Productos destacados</p>
          <h2>Herramientas para cada area</h2>
          <p>Procesos mas simples, informacion centralizada y reportes listos para actuar.</p>
        </div>
        <div className="product-grid">
          {productos.slice(0, 3).map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>
        <div className="section-action">
          <Link className="text-link" to="/productos">
            Ver todos los productos
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section-band feature-band">
        <div className="section-heading">
          <p className="eyebrow">Por que SIC-JAC</p>
          <h2>Tecnologia con enfoque practico</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.titulo} {...feature} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <Sparkles size={30} />
        <div>
          <h2>Encuentra el modulo adecuado</h2>
          <p>Explora cada producto y revisa sus funciones principales.</p>
        </div>
        <Link className="primary-button light" to="/productos">Explorar catalogo</Link>
      </section>
    </>
  );
}

export default Home;

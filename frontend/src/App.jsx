import { NavLink, Route, Routes } from 'react-router-dom';
import { BookOpen, Building2, Download, GraduationCap, Mail, MapPin } from 'lucide-react';
import Clientes from './pages/Clientes.jsx';
import Contactos from './pages/Contactos.jsx';
import Descargas from './pages/Descargas.jsx';
import Distribuidores from './pages/Distribuidores.jsx';
import Estudiantes from './pages/Estudiantes.jsx';

const navItems = [
  { to: '/', label: 'Descargas', icon: Download },
  { to: '/clientes', label: 'Clientes', icon: Building2 },
  { to: '/distribuidores', label: 'Distribuidores', icon: MapPin },
  { to: '/contactos', label: 'Contactos', icon: Mail },
  { to: '/estudiantes', label: 'Estudiantes', icon: GraduationCap }
];

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">
          <img src="/assets/logo-sic-jac.svg" alt="SIC-JAC" />
        </a>
        <nav className="main-nav" aria-label="Navegacion principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main>
        <section className="page-hero">
          <div>
            <p className="eyebrow">React + Spring Boot</p>
            <h1>Panel web SIC-JAC</h1>
            <p>
              Modulos informativos, contacto comercial y administracion basica
              de estudiantes conectada al backend documentado en Swagger.
            </p>
          </div>
          <BookOpen size={56} aria-hidden="true" />
        </section>

        <Routes>
          <Route path="/" element={<Descargas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/distribuidores" element={<Distribuidores />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>SIC-JAC</span>
        <span>Frontend desarrollado para consumir el backend Spring Boot.</span>
      </footer>
    </div>
  );
}

export default App;

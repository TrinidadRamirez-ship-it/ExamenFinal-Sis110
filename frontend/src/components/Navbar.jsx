import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/descargas', label: 'Descargas' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/contactos', label: 'Contactos' }
];

function Navbar({ open, onNavigate }) {
  return (
    <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegacion principal">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={onNavigate}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;

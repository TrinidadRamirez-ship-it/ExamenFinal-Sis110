import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="SIC-JAC inicio">
        <img src="/assets/logos/sic-jac-logo.svg" alt="SIC-JAC" />
      </Link>

      <button
        type="button"
        className="menu-button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <Navbar open={open} onNavigate={() => setOpen(false)} />
    </header>
  );
}

export default Header;

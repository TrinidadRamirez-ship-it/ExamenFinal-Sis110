import { MapPin, Phone } from 'lucide-react';
import { distribuidores } from '../data/distribuidores.js';

function Distribuidores() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Cobertura nacional</p>
        <h2>Distribuidores</h2>
        <p>
          Oficinas y contactos regionales para soporte, venta, instalacion y
          capacitacion de los modulos SIC-JAC.
        </p>
      </div>

      <div className="distributor-grid">
        {distribuidores.map((item) => (
          <article className="info-card" key={`${item.ciudad}-${item.nombre}`}>
            <span className="tag">{item.ciudad}</span>
            <h3>{item.nombre}</h3>
            <p className="with-icon">
              <MapPin size={18} />
              {item.direccion}
            </p>
            <div className="phone-list">
              {item.telefonos.map((telefono) => (
                <span key={telefono}>
                  <Phone size={16} />
                  {telefono}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Distribuidores;

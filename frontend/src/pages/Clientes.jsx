import { Building2 } from 'lucide-react';
import { clientes } from '../data/clientes.js';

function Clientes() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Confianza comercial</p>
        <h2>Nuestros clientes</h2>
        <p>
          SIC-JAC atiende empresas e instituciones de distintos sectores que
          necesitan organizar informacion contable, administrativa y tributaria.
        </p>
      </div>

      <div className="category-grid">
        {clientes.map((cliente) => (
          <article className="info-card compact" key={cliente}>
            <Building2 size={24} />
            <h3>{cliente}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Clientes;

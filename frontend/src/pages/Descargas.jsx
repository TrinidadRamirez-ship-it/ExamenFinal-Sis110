import { Download, ExternalLink } from 'lucide-react';
import { descargas } from '../data/descargas.js';

function Descargas() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Modulos disponibles</p>
        <h2>Descargas</h2>
        <p>
          Catalogo de modulos principales de SIC-JAC con informacion breve para
          guiar al usuario antes de solicitar instalacion o soporte.
        </p>
      </div>

      <div className="download-list">
        {descargas.map((modulo) => (
          <article className="info-card horizontal" key={modulo.nombre}>
            <div className="icon-box">
              <Download size={24} />
            </div>
            <div>
              <span className="tag">{modulo.categoria}</span>
              <h3>{modulo.nombre}</h3>
              <p>{modulo.descripcion}</p>
              <button className="ghost-button" type="button">
                <ExternalLink size={17} />
                Ver detalles
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Descargas;

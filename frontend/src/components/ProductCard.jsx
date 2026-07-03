import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductCard({ producto }) {
  const Icon = producto.icono;

  return (
    <article className="product-card">
      <div className={`product-icon ${producto.color}`}>
        <Icon size={26} />
      </div>
      <h3>{producto.nombre}</h3>
      <p>{producto.resumen}</p>
      <Link to={`/productos/${producto.slug}`}>
        Ver modulo
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}

export default ProductCard;

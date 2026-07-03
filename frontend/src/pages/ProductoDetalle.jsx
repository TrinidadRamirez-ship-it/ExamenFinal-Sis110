import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { buscarProducto } from '../data/productos.js';

function ProductoDetalle() {
  const { slug } = useParams();
  const producto = buscarProducto(slug);

  if (!producto) {
    return <Navigate to="/productos" replace />;
  }

  const Icon = producto.icono;

  return (
    <section className="content-section product-detail">
      <Link className="back-link" to="/productos">
        <ArrowLeft size={18} />
        Volver a productos
      </Link>

      <div className="detail-layout">
        <div className="detail-summary">
          <div className={`product-icon large ${producto.color}`}>
            <Icon size={34} />
          </div>
          <p className="eyebrow">Modulo SIC-JAC</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <Link className="primary-button" to="/contactos">
            <MessageCircle size={18} />
            Solicitar una demostracion
          </Link>
        </div>

        <div className="feature-list-panel">
          <h2>Funciones principales</h2>
          <ul>
            {producto.funciones.map((funcion) => (
              <li key={funcion}>
                <span><Check size={17} /></span>
                {funcion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;

import ProductCard from '../components/ProductCard.jsx';
import { productos } from '../data/productos.js';

function Productos() {
  return (
    <section className="content-section page-content">
      <div className="page-heading">
        <p className="eyebrow">Catalogo SIC-JAC</p>
        <h1>Productos</h1>
        <p>
          Modulos especializados para organizar las operaciones contables,
          administrativas, comerciales y laborales de una empresa.
        </p>
      </div>

      <div className="product-grid all-products">
        {productos.map((producto) => (
          <ProductCard key={producto.slug} producto={producto} />
        ))}
      </div>
    </section>
  );
}

export default Productos;

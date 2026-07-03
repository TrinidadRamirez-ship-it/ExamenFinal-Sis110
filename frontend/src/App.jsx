import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import ProductoDetalle from './pages/ProductoDetalle.jsx';
import Productos from './pages/Productos.jsx';

function PendingPage({ titulo }) {
  return (
    <section className="content-section page-content pending-page">
      <p className="eyebrow">Trabajo compartido</p>
      <h1>{titulo}</h1>
      <p>Esta seccion se integra desde la rama dev_trinidad.</p>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:slug" element={<ProductoDetalle />} />
          <Route path="/descargas" element={<PendingPage titulo="Descargas" />} />
          <Route path="/clientes" element={<PendingPage titulo="Clientes" />} />
          <Route path="/contactos" element={<PendingPage titulo="Contactos" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

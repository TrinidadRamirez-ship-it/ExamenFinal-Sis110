import { Mail, MapPinned, MessageCircle, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';

function Contactos() {
  return (
    <section className="content-section split-section">
      <div>
        <div className="section-heading align-left">
          <p className="eyebrow">Atencion comercial</p>
          <h2>Contactos</h2>
          <p>
            Canal de consulta para recibir informacion sobre adquisicion,
            instalacion, capacitacion y soporte tecnico.
          </p>
        </div>

        <div className="contact-list">
          <p>
            <MapPinned size={20} />
            Calle Loayza Esq. Camacho, Edif. Mariscal de Ayacucho, La Paz.
          </p>
          <p>
            <Phone size={20} />
            +591 2 2204200 / +591 2 2201962
          </p>
          <p>
            <MessageCircle size={20} />
            WhatsApp +591 68069736
          </p>
          <p>
            <Mail size={20} />
            consultas@sic-jac.com
          </p>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}

export default Contactos;

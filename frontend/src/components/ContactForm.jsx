import { Send } from 'lucide-react';
import { useState } from 'react';

const initialState = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
};

function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setForm(initialState);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
      </label>
      <label>
        Correo
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Asunto
        <input name="asunto" value={form.asunto} onChange={handleChange} required />
      </label>
      <label>
        Mensaje
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows="5" required />
      </label>
      <button type="submit" className="primary-button">
        <Send size={18} />
        Enviar consulta
      </button>
      {sent && <p className="success-message">Consulta preparada correctamente.</p>}
    </form>
  );
}

export default ContactForm;

import { Pencil, RefreshCcw, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { estudiantesApi, guardarToken, obtenerToken } from '../services/api.js';

const emptyForm = {
  nombre: '',
  apellido: '',
  email: '',
  codigo: '',
  edad: 20,
  semestre: 1,
  carrera: ''
};

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [token, setToken] = useState(obtenerToken());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submitLabel = useMemo(() => (editingId ? 'Actualizar' : 'Crear'), [editingId]);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  async function cargarEstudiantes() {
    try {
      setLoading(true);
      setMessage('');
      const data = await estudiantesApi.listar();
      setEstudiantes(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleTokenChange(event) {
    const value = event.target.value;
    setToken(value);
    guardarToken(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      const payload = {
        ...form,
        edad: Number(form.edad),
        semestre: Number(form.semestre)
      };

      if (editingId) {
        await estudiantesApi.actualizar(editingId, payload);
        setMessage('Estudiante actualizado correctamente.');
      } else {
        await estudiantesApi.crear(payload);
        setMessage('Estudiante creado correctamente.');
      }

      setForm(emptyForm);
      setEditingId(null);
      await cargarEstudiantes();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function editar(estudiante) {
    setEditingId(estudiante.id);
    setForm({
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      email: estudiante.email,
      codigo: estudiante.codigo,
      edad: estudiante.edad,
      semestre: estudiante.semestre,
      carrera: estudiante.carrera
    });
  }

  async function eliminar(id) {
    try {
      setLoading(true);
      setMessage('');
      await estudiantesApi.eliminar(id);
      setMessage('Estudiante eliminado correctamente.');
      await cargarEstudiantes();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function cancelarEdicion() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Backend Spring Boot</p>
        <h2>Estudiantes</h2>
        <p>
          Pantalla conectada a los endpoints protegidos de Swagger. Pega un JWT
          valido para listar, crear, actualizar o eliminar registros.
        </p>
      </div>

      <div className="token-panel">
        <ShieldCheck size={22} />
        <label>
          Token JWT
          <input
            value={token}
            onChange={handleTokenChange}
            placeholder="Token generado por /api/auth/login"
          />
        </label>
      </div>

      <div className="student-layout">
        <form className="student-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Editar estudiante' : 'Nuevo estudiante'}</h3>
          <div className="form-grid">
            <label>
              Nombre
              <input name="nombre" value={form.nombre} onChange={handleChange} required minLength="2" />
            </label>
            <label>
              Apellido
              <input name="apellido" value={form.apellido} onChange={handleChange} required minLength="2" />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Codigo
              <input name="codigo" value={form.codigo} onChange={handleChange} placeholder="SIS-1001" required />
            </label>
            <label>
              Edad
              <input name="edad" type="number" min="16" max="80" value={form.edad} onChange={handleChange} required />
            </label>
            <label>
              Semestre
              <input name="semestre" type="number" min="1" max="10" value={form.semestre} onChange={handleChange} required />
            </label>
            <label className="wide-field">
              Carrera
              <input name="carrera" value={form.carrera} onChange={handleChange} required minLength="3" />
            </label>
          </div>
          <div className="button-row">
            <button className="primary-button" type="submit" disabled={loading}>
              <Save size={18} />
              {submitLabel}
            </button>
            {editingId && (
              <button className="ghost-button" type="button" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="student-table-panel">
          <div className="table-header">
            <h3>Registros</h3>
            <button className="icon-button" type="button" onClick={cargarEstudiantes} aria-label="Recargar estudiantes">
              <RefreshCcw size={18} />
            </button>
          </div>
          {message && <p className="status-message">{message}</p>}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Sem.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id}>
                    <td>{estudiante.codigo}</td>
                    <td>{estudiante.nombre} {estudiante.apellido}</td>
                    <td>{estudiante.carrera}</td>
                    <td>{estudiante.semestre}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" onClick={() => editar(estudiante)} aria-label="Editar estudiante">
                          <Pencil size={16} />
                        </button>
                        <button type="button" onClick={() => eliminar(estudiante.id)} aria-label="Eliminar estudiante">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!estudiantes.length && (
                  <tr>
                    <td colSpan="5">{loading ? 'Cargando...' : 'Sin registros para mostrar.'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Estudiantes;

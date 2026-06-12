import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFetch } from '../../hooks/useFetch.js';

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: item, loading, error } = useFetch(async () => (await api.get(`/classes/${id}`)).data, [id]);

  const book = async () => {
    if (!user) return navigate('/login');
    await api.post('/bookings', { fitnessClass: id, notes: '' });
    navigate('/dashboard');
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="detail card">
      <span className="pill">{item.category} · {item.level}</span>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <div className="detail-grid">
        <p><strong>Instructor:</strong> {item.instructor?.fullName}</p>
        <p><strong>Fecha:</strong> {new Date(item.date).toLocaleString('es-ES')}</p>
        <p><strong>Duración:</strong> {item.durationMinutes} min</p>
        <p><strong>Ubicación:</strong> {item.location}</p>
        <p><strong>Cupo:</strong> {item.capacity} plazas</p>
        <p><strong>Precio:</strong> {item.price}€</p>
      </div>
      <button className="button big" onClick={book}>Reservar plaza</button>
    </section>
  );
}

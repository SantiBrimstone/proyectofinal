import api from '../../api/client';
import ClassCard from '../../components/ClassCard/ClassCard.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { useClassFilters } from '../../hooks/useClassFilters.js';

export default function Classes() {
  const { data = [], loading, error } = useFetch(async () => (await api.get('/classes')).data, []);
  const { filters, filteredClasses, setFilter, resetFilters } = useClassFilters(data || []);

  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <div className="section-heading">
        <h1>Clases disponibles</h1>
        <p>Filtra por disciplina, nivel o nombre.</p>
      </div>
      <div className="filters">
        <input placeholder="Buscar" value={filters.search} onChange={e => setFilter('search', e.target.value)} />
        <select value={filters.category} onChange={e => setFilter('category', e.target.value)}>
          <option value="">Todas</option><option>Yoga</option><option>HIIT</option><option>Pilates</option><option>Boxeo</option><option>Spinning</option><option>Fuerza</option>
        </select>
        <select value={filters.level} onChange={e => setFilter('level', e.target.value)}>
          <option value="">Todos los niveles</option><option>Inicial</option><option>Intermedio</option><option>Avanzado</option>
        </select>
        <button className="ghost" onClick={resetFilters}>Limpiar</button>
      </div>
      <div className="grid">{filteredClasses.map(item => <ClassCard key={item._id} item={item} />)}</div>
    </section>
  );
}

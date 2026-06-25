import api from '../../api/client';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import React from 'react';

export default function Admin() {
  const { data: users = [], loading, error } = useFetch(async () => (await api.get('/users')).data, []);
  const { data: bookings = [] } = useFetch(async () => (await api.get('/bookings')).data, []);
  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;
  return (
    <section>
      <h1>Panel de administración</h1>
      <div className="stats"><article><strong>{users.length}</strong><span>usuarios</span></article><article><strong>{bookings.length}</strong><span>reservas</span></article></div>
      <div className="card table-wrap"><table><thead><tr><th>Nombre</th><th>Email</th><th>Rol</th></tr></thead><tbody>{users.map(u => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody></table></div>
    </section>
  );
}

import api from '../../api/client';
import BookingCard from '../../components/BookingCard/BookingCard.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import React from 'react';

export default function Dashboard() {
  const { data = [], loading, error, reload } = useFetch(async () => (await api.get('/bookings/mine')).data, []);
  const cancel = async id => { await api.patch(`/bookings/${id}/cancel`); reload(); };
  if (loading) return <Spinner />;
  if (error) return <p className="error">{error}</p>;
  return <section><h1>Mis reservas</h1><div className="grid small">{data.map(item => <BookingCard key={item._id} booking={item} onCancel={cancel} />)}</div></section>;
}

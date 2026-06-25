import React from 'react';

export default function BookingCard({ booking, onCancel }) {
  const item = booking.fitnessClass;
  return (
    <article className="card booking-card">
      <h3>{item?.title}</h3>
      <p>{new Date(item?.date).toLocaleString('es-ES')}</p>
      <p>{item?.location} · {item?.instructor?.fullName}</p>
      <span className={`pill ${booking.status === 'cancelled' ? 'danger' : ''}`}>{booking.status}</span>
      {booking.status !== 'cancelled' && <button className="ghost danger-text" onClick={() => onCancel(booking.id || booking._id)}>Cancelar</button>}
    </article>
  );
}

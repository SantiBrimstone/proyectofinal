import { Link } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import React from 'react';

export default function ClassCard({ item }) {
  const date = new Date(item.date).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
  return (
    <article className="card class-card">
      <div className="class-image">
  <img
    src={item.image}
    alt={item.title}
    loading="lazy"
  />
</div>
      <div className="card-content">
        <span className="pill">{item.level}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p className="meta"><CalendarDays size={16} /> {date}</p>
        <p className="meta"><MapPin size={16} /> {item.location}</p>
        <div className="card-actions">
          <strong>{item.price}€</strong>
          <Link className="button" to={`/classes/${item.id || item._id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  );
}

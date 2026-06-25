import { Link } from 'react-router-dom';
import React from 'react';

export default function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Entrena cerca, reserva fácil</span>
        <h1>ReservaFit conecta personas con clases deportivas locales.</h1>
        <p>Una plataforma para descubrir actividades, reservar plaza y gestionar asistencia con una experiencia clara y rápida.</p>
        <Link className="button big" to="/classes">Explorar clases</Link>
      </div>
      <div className="hero-panel">
        <h2>Por qué existe</h2>
        <p>Muchos centros pequeños gestionan reservas por mensajes sueltos. ReservaFit centraliza horarios, cupos y usuarios.</p>
      </div>
    </section>
  );
}

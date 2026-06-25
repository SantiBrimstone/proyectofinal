import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section>
      <div className="section-heading">
        <h1>Mi perfil</h1>
      </div>

      <article className="card profile-card">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={user.name}
            className="profile-avatar"
          />
        )}

        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>Rol: {user?.role}</p>
      </article>
    </section>
  );
}
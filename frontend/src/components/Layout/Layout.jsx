import { Link, NavLink, Outlet } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import React from 'react';

export default function Layout() {
  const { user, isAdmin, logout } = useAuth();
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand"><Dumbbell size={26} /> ReservaFit</Link>
        <nav className="nav">
  <NavLink to="/classes">Clases</NavLink>

  {user && <NavLink to="/dashboard">Mis reservas</NavLink>}

  {user && <NavLink to="/profile">Mi perfil</NavLink>}

  {isAdmin && <NavLink to="/admin">Admin</NavLink>}

  {user?.avatar && (
    <img
      src={user.avatar}
      alt={user.name}
      className="navbar-avatar"
    />
  )}

  {user ? (
    <button className="ghost" onClick={logout}>Salir</button>
  ) : (
    <NavLink to="/login">Entrar</NavLink>
  )}
</nav>
      </header>
      <main className="main"><Outlet /></main>
      <footer className="footer">ReservaFit</footer>
    </>
  );
}

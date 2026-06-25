import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import React from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const submit = async e => { e.preventDefault(); await login(form); navigate('/dashboard'); };
  return (
    <form className="auth card" onSubmit={submit}>
      <h1>Entrar</h1>
      {error && <p className="error">{error}</p>}
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Contraseña" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="button" disabled={loading}>Iniciar sesión</button>
      <p>Admin demo: admin@reservafit.com / 123456</p>
      <Link to="/register">Crear cuenta</Link>
    </form>
  );
}

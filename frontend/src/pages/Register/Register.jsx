import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import React from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', avatar: null });
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => value && data.append(key, value));
    await register(data); navigate('/dashboard');
  };
  return (
    <form className="auth card" onSubmit={submit}>
      <h1>Crear cuenta</h1>
      {error && <p className="error">{error}</p>}
      <input placeholder="Nombre" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setForm({ ...form, avatar: e.target.files[0] })} />
      <button className="button">Registrarme</button>
    </form>
  );
}

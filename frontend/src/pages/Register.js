import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert('Registro exitoso. Ahora inicia sesión.');
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error al registrar:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" className="form-control" placeholder="Usuario" onChange={handleChange} />
        <input name="password" type="password" className="form-control mt-2" placeholder="Contraseña" onChange={handleChange} />
        <button className="btn btn-success mt-3">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
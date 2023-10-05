import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'delitos-api-token-jwt': '',
        },
        body: JSON.stringify({ correoElectronico: email, contraseña: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const tokenapi = data.token;
        setToken(tokenapi);
        localStorage.setItem('token', tokenapi);
        // Guarda el token en el estado o en una cookie
        // Redirige al usuario a la página principal
        history.push('/home');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Error interno del servidor');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

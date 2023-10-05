import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from 'jwt-decode'; 
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Redirige al usuario a la página correspondiente según su rol
      const decodedToken = decodeToken(storedToken); // Decodifica el token
      if (decodedToken) {
        const { rol } = decodedToken;
        console.log(decodedToken);
        switch (rol) {
          case "Admin":
            history.push("/admin"); // Redirige al usuario Admin a la página de inicio de Admin
            break;
          case "Autoridad":
            history.push("/autoridad"); // Redirige al usuario Admin a la página de inicio de Admin
            break;
          case "Ciudadano":
            history.push("/ciudadano"); // Redirige al usuario Admin a la página de inicio de Admin
            break;
          // Agrega casos adicionales para otros roles si es necesario
          default:
            history.push("/login"); // Redirige a una ruta por defecto para otros roles
            break;
        }
      }
    }
  }, [history]);
  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token); // Decodifica el token
      return decoded;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/login",
        {
          correoElectronico: email,
          contraseña: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "delitos-api-token-jwt": "",
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const tokenapi = data;
        const rol=tokenapi.usuario.rol;
        setToken(tokenapi);
        localStorage.setItem("token", tokenapi);
        switch (rol) {
          case "Admin":
            history.push("/admin"); 
            break;
          case "Autoridad":
            history.push("/autoridad");
            break;
          case "Ciudadano":
            history.push("/ciudadano"); 
            break;
          default:
            history.push("/login"); 
            break;
        }
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError("Error interno del servidor");
    }
  };
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <Form className="create.form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Correo Electrónico:</label>
          <input
            placeholder="Ingresa tu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Contraseña:</label>
          <input
            placeholder="Introduce tu contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

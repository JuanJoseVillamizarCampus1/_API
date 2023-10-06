import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");


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
        const token = tokenapi.token;
        const rol = tokenapi.usuario.rol;
        const idusu = tokenapi.usuario._id;
        setToken(tokenapi);
        localStorage.setItem("rol", rol);
        localStorage.setItem("token", token);
        localStorage.setItem("Usuario", JSON.stringify(idusu));
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
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
};

export default Login;

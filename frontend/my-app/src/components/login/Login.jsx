import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../header/Navbar";
import logo from "../../assets/images/logo.png";
import "./Login.css"; // Importa tu archivo CSS de estilos

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
        const id = tokenapi.usuario._id;
        setToken(tokenapi);
        localStorage.setItem("rol", rol);
        localStorage.setItem("token", token);
        localStorage.setItem("Usuario", id);
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
      <div className="App">
        <Navbar />
      </div>
      <div className="login-container">
        <img src={logo} className="logo-i" alt="Logo" />
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input">
            <label>Correo Electrónico:</label>
            <input
              placeholder="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input">
            <label>Contraseña:</label>
            <input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </div>
        </form>
        {error && (
          <div>
            <p className="login-error">{error}</p>
          </div>
        )}
        <Link to="/" className="login-link">
          Atrás
        </Link>
      </div>
    </div>
  );
};

export default Login;

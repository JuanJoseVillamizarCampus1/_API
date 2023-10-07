import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../header/Navbar";
import "./Registro.css"; // Importa un archivo CSS para los estilos

const Registro = () => {
  const history = useHistory();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("Ciudadano");
  const [error, setError] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/usuarios",
        {
          nombre,
          apellido,
          correoElectronico,
          contraseña,
          rol,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        history.push("/login");
      } else {
        setError("Error en la solicitud de registro");
      }
    } catch (error) {
      setError("Error en la solicitud de registro");
    }
  };

  return (
    <div>
      <div className="App">
        <Navbar />
      </div>
      <div className="fondo-r">
        <div className="registro-container">
          <h1>Registro de Usuario</h1>
          <form onSubmit={handleRegistro} className="registro-form">
            <div className="registro-input">
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="registro-input">
              <label>Apellido:</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="registro-input">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                required
              />
            </div>
            <div className="registro-input">
              <label>Contraseña:</label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
            <div className="registro-input">
              <label>Rol:</label>
              <select onChange={(e) => setRol(e.target.value)} value={rol}>
                <option value="Ciudadano">Ciudadano</option>
                <option value="Autoridad">Autoridad</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="registro-button">
              Registrar
            </button>
            {error && <p className="registro-error">{error}</p>}
          </form>
          <Link to="/" className="registro-link">
            <button className="registro-back-button">Atras</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;

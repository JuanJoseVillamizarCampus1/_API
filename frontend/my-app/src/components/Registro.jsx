import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const history = useHistory();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("Ciudadano"); // Establece el rol por defecto

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
        // Registro exitoso, redirige al usuario a la página de inicio de sesión
        history.push("/login");
      } else {
        // Manejar errores de validación u otros
        console.error("Error en la solicitud de registro");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro", error);
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleRegistro}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol:</label>
          <select onChange={(e) => setRol(e.target.value)} value={rol}>
            <option value="Ciudadano">Ciudadano</option>
            <option value="Autoridad">Autoridad</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      <Link to="/">
        <button>Atras</button>
      </Link>
    </div>
  );
};

export default Registro;

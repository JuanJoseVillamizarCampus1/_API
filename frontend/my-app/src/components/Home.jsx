import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Página de Inicio - Delitos</h1>
      <p>Bienvenido a la plataforma de denuncias de delitos.</p>
      <div>
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
      </div>
      <div>
        <Link to="/registro">
          <button>Registrarse</button>
        </Link>
      </div>
      <div>
        <Link to="/denuncia-anonima">
          <button>Hacer Denuncia Anónima</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
